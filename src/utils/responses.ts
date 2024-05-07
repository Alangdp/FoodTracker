import { Response } from 'express';
import { ResponseProps, ErrorResponse } from '../types/Response.type';
import { AxiosError } from 'axios';
import { ZodError } from 'zod';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export function response<T>(
  res: Response,
  { data, status, errors }: ResponseProps<T>
) {
  return res
    .status(status)
    .json({ status: status, data: data, errors: !errors ? [] : errors });
}

export function errorResponse(res: Response, error: any) {
  if(error instanceof PrismaClientKnownRequestError) {
    const requestError = error;

    const errorMessage: string = requestError.meta?.cause as any;
    if(errorMessage === "Record to delete does not exist. ") {
      return response(res, {
        errors: [addError("Invalid Id", null)],
        status: 400
      });
    }

    return response(res, {
      errors:[addError(String(requestError.meta?.cause), null)],
      status: 400
    });
  }

  if(error instanceof ZodError) {
    const zodError = error;
    const errors = [];

    for( const err of zodError.errors) {
      errors.push(addError(`${err.message} ${String(err.path)}`, null));
    }

    return response(res, {
      errors: errors,
      status: 400
    });
  }

  if(error instanceof AxiosError) {
    if(error.response) {
      const responseError: ResponseProps<any> = error.response.data;
      return response(res, {
        data: {},
        status: responseError.status,
        errors: responseError.errors?.map((err) => addError(err.message, {})),
      });
    }

    if(error.status) {{
      return response(res, {
        data: {},
        status: error.status ? 400 : 200,
        errors: [addError(error.message, {})],
      });
    }}

    return response(res, {
      data: {},
      status: 400,
      errors: [addError(error.message, {})],
    });
  }

  if (error instanceof TypeError)
    return response(res, {
      data: {},
      status: 500,
      errors: [addError('Internal Error', {})],
    });

  return response(res, {
    data: {},
    status: 500,
    errors: [addError(error.message, {})],
  });
}

export function addError(message: string, data: any): ErrorResponse {
  return { message, data };
}