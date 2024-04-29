import { NextFunction, Request, Response } from "express";
import multer from "multer";
import path from "path";
import { errorResponse } from "../utils/responses";

const storage = multer.diskStorage({
  destination: './temp/images/products',
  filename: (req, file, cb) => {
    if(!req.body.tempFiles) req.body.tempFiles = [];
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpeg'];
    const ext = path.extname(file.originalname).toLowerCase();
    const tempFileName = file.fieldname + '-' + Date.now() + ext;
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, file.fieldname + '-' + Date.now() + ext);
      req.body.tempFiles.push(tempFileName);
      return;
    } else {
      cb(new Error("Invalid File Extension"), "Invalid File Extension");
      return;
    }
  }
});

const upload = multer({ storage });

function uploadFileImage(req: Request, res: Response, next: NextFunction) {
  upload.array('image')(req, res, function (err) {
    if (err) {
      return errorResponse(res, err);
    }
    next();
  });
}

export { uploadFileImage };
