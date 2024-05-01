import { RequestHandler } from 'express';

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
  return res.render("product.ejs");
};

