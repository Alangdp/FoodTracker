import path from 'path';
import express, { Application } from "express";

import companyRoutes from "./routes/company.router";
import userRoutes from "./routes/user.router";
import pagesRoutes from "./routes/pages.router";
import productRoutes from "./routes/product.router";


const __dirname = path.resolve();

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.settings();
    this.routes();
  }

  routes() {
    this.app.use("/v1/company", companyRoutes);
    this.app.use("/v1/user", userRoutes);
    this.app.use("/v1/product", productRoutes);
    this.app.use("/", pagesRoutes);
  }

  settings() {
    this.app.set("view engine", "ejs");
    this.app.set("views", path.resolve(__dirname, "src", "views"));

    this.app.use("/public", express.static(path.resolve(__dirname, "public")));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }
}

export default new App().app;