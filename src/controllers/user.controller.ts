import { RequestHandler } from 'express';
import { errorResponse, response } from '../utils/responses';

import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt";
import { UserFilterSchema } from '../types/User.type';

const prisma = new PrismaClient();

// prisma.admin = Users
export const index: RequestHandler = async (req, res) => {
  try {
    const companies = await prisma.admin.findMany();
    return response(res, { status: 200, data: companies });
  } catch (error) {
    return errorResponse(res, error);
  }
};

export const store: RequestHandler = async (req, res) => {
  try {
    const userProps = UserFilterSchema.parse({ ...req.body });
    const user = await prisma.admin.create({data: {
      ...userProps,
      password: bcrypt.hashSync(userProps.password, 8),
    }});
    return response(res, { status: 200, data: user });
  } catch (error) {
    return errorResponse(res, error);
  }
};

// TODO - Atualizar para utilizar token futuramente
export const put: RequestHandler = async (req, res) => {
  try {
    const userId = req.params.userId;
    const userProps = UserFilterSchema.parse({ ...req.body });
    const company = await prisma.company.update({
      where: { id: userId },
      data: { ...userProps },
    });
    return response(res, { status: 200, data: company });
  } catch (error) {
    return errorResponse(res, error);
  }
};

// TODO - Atualizar para utilizar token futuramente
export const destroy: RequestHandler = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await prisma.company.delete({where: {id: userId}});
    return response(res, { status: 200, data: user });
  } catch (error) {
    return errorResponse(res, error);
  }
};


