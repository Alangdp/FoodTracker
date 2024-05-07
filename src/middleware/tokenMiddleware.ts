import jwt, { SignOptions, VerifyOptions } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { RequestHandler } from 'express';
import { addError, response } from '../utils/responses';

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
  const authorization: string | undefined = req.headers.authorization as string | undefined;

  if (!authorization) {
    return response(res, { status: 401, errors: [addError("Token not found", {})] });
  }

  const [, token] = authorization.split(' ');

  const verifyOptions: VerifyOptions = { issuer: 'Midleware' };
  try {
    const decodedToken: TokenPayload = jwt.verify(token, SECRET_TOKEN, verifyOptions) as TokenPayload;
    req.body.id = decodedToken.id;
    next();
  } catch (error) {
    return response(res, { status: 401, errors: [addError("Invalid Token", {})] });
  }
};

export { loginRequired, createToken, validateToken };
