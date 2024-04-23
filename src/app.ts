import express, { Application } from "express";

import companyRoutes from "./routes/company.route";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.settings();
    this.routes();
  }

  routes() {
    this.app.use("/", companyRoutes);
  }

  settings() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }
}

export default new App().app;