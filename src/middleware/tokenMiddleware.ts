import jwt, { SignOptions, VerifyOptions } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { RequestHandler } from 'express';
import { addError, response } from '../utils/responses';
import { Redirect } from '../utils/redirect';

dotenv.config();

const SECRET_TOKEN: string = process.env.SECRET_TOKEN as string;

type TokenPayload = {
  exp: number;
  iss: string;
  id: string;
}

// Função para criar um token JWT
const createToken = (id: string): string => {
  const expirationTime = new Date();
  expirationTime.setMinutes(expirationTime.getMinutes() + 60);

  const signOptions: SignOptions = { expiresIn: '1h', issuer: 'Midleware' };
  const token: string = jwt.sign({ issuer: "Midleware", id }, SECRET_TOKEN, signOptions);

  return token;
};

const validateToken = async (token: string): Promise<TokenPayload | null> => {
  const verifyOptions: VerifyOptions = { issuer: 'Middleware' };

  try {
    const decodedToken: TokenPayload = jwt.verify(token, SECRET_TOKEN, verifyOptions) as TokenPayload;
    return decodedToken;
  } catch (error) {
    return null;
  }
};

// Middleware para verificar o token de autenticação
const loginRequired: RequestHandler = async (req, res, next) => {
  const redirect = new Redirect({request: req, response: res});
  const token: string | undefined = req.session.token;

  console.log(token, "MIDDLEWARE");

  if (!token) {
    return redirect.error("Login Obrigátorio", "/company/login");
  }
  const verifyOptions: VerifyOptions = { issuer: 'Midleware' };
  try {
    const decodedToken: TokenPayload = jwt.verify(token, SECRET_TOKEN, verifyOptions) as TokenPayload;
    req.body.id = decodedToken.id;
    next();
  } catch (error) {
    req.flash("Error", "Login Required");
    return res.redirect("/company/login");
  }
};

export { loginRequired, createToken, validateToken };
