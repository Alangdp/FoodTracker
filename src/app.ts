import express, { Application } from "express";

import companyRoutes from "./routes/company.router";
import userRoutes from "./routes/user.router";


class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.settings();
    this.routes();
  }

  routes() {
    this.app.use("/company", companyRoutes);
    this.app.use("/user", userRoutes);
  }

  settings() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }
}

export default new App().app;