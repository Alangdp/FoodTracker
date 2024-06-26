import { RequestHandler } from 'express';
import { errorResponse, response } from '../utils/responses';
import {
  CompanyFilterSchema,
  CompanyProps,
} from '../types/Company.type';
import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt";
import Company from '../models/Company.model';
import { createToken } from '../middleware/tokenMiddleware';

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
    const companyProps = CompanyFilterSchema.parse({ ...req.body, contact: req.body.phone });
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
    const companyProps = CompanyFilterSchema.optional().parse({ ...req.body });
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

export const login: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const companyDB = await prisma.company.findFirst({where: {email}});
    if(!companyDB) throw new Error("Invalid Email");
    const companyProps: CompanyProps = CompanyFilterSchema.parse({ ...companyDB, id: companyDB.id});
    const company = new Company({...companyProps});
    if(!company.login(password)) throw new Error("Invalid Email or Password");
    const token = createToken(company.id!);
    return response(res, { status: 200, data: {token} });
  } catch (error) {
    console.log(error);
    return errorResponse(res, error);
  }
};

export const getCompany: RequestHandler = async (req, res) => {
  try {
    return response(res, { status: 200, data: {valid: true} });
  } catch (error) {
    console.log(error);
    return errorResponse(res, error);
  }
};


