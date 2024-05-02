import { Prisma, PrismaClient } from '@prisma/client';
import { RequestHandler } from 'express';

const prisma = new PrismaClient();

export const home: RequestHandler = async (req, res) => {
  return res.render("index.ejs");
};

export const login: RequestHandler = async (req, res) => {
  return res.render("login.ejs");
};

export const register: RequestHandler = async (req, res) => {
  return res.render("register.ejs");
};

export const products: RequestHandler = async (req, res) => {
  const data = await prisma.product.findMany();

  return res.render("products.ejs", {products: data});
};

export const productRegister: RequestHandler = async (req, res) => {
  return res.render("products-register.ejs");
};

