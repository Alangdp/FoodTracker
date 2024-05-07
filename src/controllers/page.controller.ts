import { PrismaClient } from '@prisma/client';
import { RequestHandler } from 'express';
import { ImageDabatase } from '../models/ImageDatabase.model';
import { ImageProps } from '../types/Image.type';

const prisma = new PrismaClient();

export const home: RequestHandler = async (req, res) => {
  return res.render('index.ejs');
};

export const login: RequestHandler = async (req, res) => {
  const messages = req.flash();
  return res.render('login.ejs', { messages });
};

export const register: RequestHandler = async (req, res) => {
  const messages = req.flash();
  return res.render('register.ejs', { messages });
};

type imageKeyOf = {
  [key: string]: ImageProps[]
}

export const products: RequestHandler = async (req, res) => {
  if (!req.session.companyId) {
    req.flash('Error', 'Necesário estar logado');
    res.redirect('/company/login');
  }

  const messages = req.flash();
  const images: imageKeyOf = {};
  console.log(req.session);
  const data = await prisma.product.findMany();
  for (const product of data) {
    images[product.id] = await ImageDabatase.getAllImagesByProductId(product.id);
  }

  return res.render('products.ejs', {
    products: data,
    images,
    company: {
      id: req.session.companyId,
    },
    messages,
  });
};

export const productRegister: RequestHandler = async (req, res) => {
  return res.render('products-register.ejs');
};
