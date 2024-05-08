import { Request, Response } from 'express';

type RedirectProps = {
  request: Request;
  response: Response;
}

export class Redirect {
  private req: Request;
  private res: Response;

  constructor({request, response}: RedirectProps) {
    this.req = request;
    this.res = response;
  }

  error(message: string | string[], path: string) {
    this.req.flash('Error', message);
    return this.res.redirect(path);
  }

  sucess(message: string | string[], path: string) {
    this.req.flash('Success', message);
    return this.res.redirect(path);
  }
}