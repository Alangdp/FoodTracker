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
    return res.redirect("/company/login");
  } catch (error) {
    req.flash("Error", getErrors(error).map( error => error.message));
    return res.redirect("/company/register");
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
  try {
    const companyId = req.params.companyId;
    await prisma.company.delete({where: {id: companyId}});
    return res.redirect(req.originalUrl);
  } catch (error) {
    req.flash("Error", getErrors(error).map( error => error.message));
    return res.redirect("/");
  }
};

export const login: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const company = new Company(CompanyFilterSchema.parse(await prisma.company.findFirst({where: {email}})));
    if(!company.login(password)) return res.redirect(req.originalUrl);
    req.session.companyId = createToken(company.id!);
    req.flash("Success", "Logado Com sucesso");
    return res.redirect("/company/products");
  } catch (error) {
    console.log(error);
    const errors = getErrors(error).map( error => error.message);
    req.flash("Error", errors);
    return res.redirect("/company/login");
  }
};

export const getCompany: RequestHandler = async (req, res) => {
  try {
    return response(res, { status: 200, data: {valid: true} });
  } catch (error) {
    return errorResponse(res, error);
  }
};


