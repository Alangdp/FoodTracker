import { RequestHandler } from 'express';

export const home: RequestHandler = async (req, res) => {
  return res.render("./includes/Navbar.ejs");
};

