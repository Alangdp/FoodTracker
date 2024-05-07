import path from 'path';
import express, { Application } from "express";
import flash from "express-flash";
import cookieParser from "cookie-parser";

import companyRoutes from "./routes/company.router";
import userRoutes from "./routes/user.router";
import pagesRoutes from "./routes/pages.router";
import productRoutes from "./routes/product.router";
import session from "express-session";
import { configDotenv } from 'dotenv';

const __dirname = path.resolve();

configDotenv();

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

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(flash());
    this.app.use(session({
      secret: process.env.SECRET_TOKEN as string || "SECRET_TOKEN",
      resave: true,
      saveUninitialized: true
    }));
  }
}

export default new App().app;