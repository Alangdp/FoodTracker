import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { AxiosError } from "axios";
import { ZodError } from "zod";
import { ErrorResponse, ResponseProps } from "../types/Response.type";

export function getErrors(error: any): ErrorResponse[] {
  if (error instanceof PrismaClientKnownRequestError) {
    const requestError = error;
    const errorMessage: string = requestError.meta?.cause as any;

    if (errorMessage === "Record to delete does not exist. ") {
      return [addError("Invalid Id", null)];
    }

    return [addError(String(requestError.meta?.cause), null)];
  }

  if (error instanceof ZodError) {
    const zodError = error;
    const errors = [];

    for (const err of zodError.errors) {
      errors.push(addError(`${err.message} ${String(err.path)}`, null));
    }

    return errors;
  }

  if (error instanceof AxiosError) {
    if (error.response) {
      const responseError: ResponseProps<any> = error.response.data;
      return responseError.errors!.map((err) => addError(err.message, {}));
    }

    if (error.status) {
      return [addError(error.message, {})];
    }

    return [addError(error.message, {})];
  }

  if (error instanceof TypeError) {
    return [addError('Internal Error', {})];
  }

  return [addError(error.message, {})];
}

export function addError(message: string, data: any): ErrorResponse {
  return { message, data };
}
