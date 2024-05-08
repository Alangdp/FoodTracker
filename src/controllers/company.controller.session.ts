import { RequestHandler } from 'express';
import { errorResponse, response } from '../utils/responses';
import {
  CompanyFilterSchema,
  CompanyProps,
} from '../types/Company.type';
import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt";
import Company from '../models/Company.model';
import { getErrors } from '../utils/errorParser';
import { createToken } from '../middleware/tokenMiddleware';
import { Redirect } from '../utils/redirect';

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
  const redirect = new Redirect({request: req, response: res}); 

  try {
    const companyProps = CompanyFilterSchema.parse({ ...req.body, contact: req.body.phone });
    await prisma.company.create({ data: {
      ...companyProps,
      password: bcrypt.hashSync(companyProps.password, 8),
    }});
    return redirect.sucess("Conta criado com sucesso","/company/login");
  } catch (error) {
    const errors = getErrors(error).map( error => error.message);
    return redirect.error(errors, "/company/register");
  }
};

// TODO - Atualizar para utilizar token futuramente
export const put: RequestHandler = async (req, res) => {


  try {
    const companyId = req.params.companyId;
    const companyProps = CompanyFilterSchema.optional().parse({ ...req.body });
    await prisma.company.update({
      where: { id: companyId },
      data: { ...companyProps },
    });
    return res.redirect(req.originalUrl);
  } catch (error) {
    req.flash("Error", getErrors(error).map( error => error.message));
    return res.redirect("/");
  }
};

// TODO - Atualizar para utilizar token futuramente
export const destroy: RequestHandler = async (req, res) => {
  const redirect = new Redirect({request: req, response: res}); 

  try {
    const companyId = req.params.companyId;
    await prisma.company.delete({where: {id: companyId}});
    return redirect.sucess("Conta criado com sucesso", "/company/login");
  } catch (error) {
    const errors = getErrors(error).map( error => error.message);
    return redirect.error(errors, "/home");
  }
};

export const login: RequestHandler = async (req, res) => {
  const redirect = new Redirect({request: req, response: res}); 

  try {
    const { email, password } = req.body;
    const companyDb = await prisma.company.findFirst({where: {email}});

    if(!companyDb) return redirect.error("Email ou senha inválidos", "/company/login");
    const company = new Company(CompanyFilterSchema.parse(companyDb));
    if(!company || !company.login(password) ) {
      return redirect.error("Email ou senha inválidos", "/company/login");
    }

    req.session.token = createToken(company.id!);
    return redirect.sucess("Logado com sucesso", "/");

  } catch (error) {
    const errors = getErrors(error).map( error => error.message);
    return redirect.error(errors, "/company/login");
  }
};

export const getCompany: RequestHandler = async (req, res) => {
  try {
    return response(res, { status: 200, data: {valid: true} });
  } catch (error) {
    return errorResponse(res, error);
  }
};


