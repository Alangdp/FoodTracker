import express, { Application } from "express";


class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.settings();
    this.routes();
  }

  routes() {

  }

  settings() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }
}

export default new App().app;