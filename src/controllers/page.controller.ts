import { Image, Prisma, PrismaClient } from '@prisma/client';
import { RequestHandler } from 'express';
import { ImageDabatase } from '../models/ImageDatabase.model';
import { ImageProps } from '../types/Image.type';

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

type imageKeyOf = {
  [key: string] : ImageProps[]
}

export const products: RequestHandler = async (req, res) => {
  const images: imageKeyOf = {};
  const data = await prisma.product.findMany();
  for(const product of data) {
    images[product.id] = await ImageDabatase.getAllImagesByProductId(product.id);
  }

  console.log(images);
  return res.render("products.ejs", {products: data, images});
};

export const productRegister: RequestHandler = async (req, res) => {
  return res.render("products-register.ejs");
};

