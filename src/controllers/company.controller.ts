import { RequestHandler } from 'express';
import { errorResponse, response } from '../utils/responses';
import {
  CompanyFilterSchema,
  CompanyFilterSchemaPartial,
} from '../types/Company.type';
import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const index: RequestHandler = async (req, res) => {
  try {
    const companies = await prisma.company.findMany();
    return response(res, { status: 200, data: companies });
  } catch (error) {
    return errorResponse(res, error);
  }
};

export const store: RequestHandler = async (req, res) => {
  try {
    const companyProps = CompanyFilterSchema.parse({ ...req.body });
    const company = await prisma.company.create({ data: {
      ...companyProps,
      password: bcrypt.hashSync(companyProps.password, 8),
    } });
    return response(res, { status: 200, data: company });
  } catch (error) {
    return errorResponse(res, error);
  }
};

// TODO - Atualizar para utilizar token futuramente
export const put: RequestHandler = async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const companyProps = CompanyFilterSchemaPartial.parse({ ...req.body });
    const company = await prisma.company.update({
      where: { id: companyId },
      data: { ...companyProps },
    });
    return response(res, { status: 200, data: company });
  } catch (error) {
    return errorResponse(res, error);
  }
};

// TODO - Atualizar para utilizar token futuramente
export const destroy: RequestHandler = async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const company = await prisma.company.delete({where: {id: companyId}});
    return response(res, { status: 200, data: company });
  } catch (error) {
    return errorResponse(res, error);
  }
};


