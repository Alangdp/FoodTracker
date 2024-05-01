// TODO - SISTEMA DE APAGAR E MOVER IMAGENS BASEADO NO STATUS DA CRIACAO

import fs from "fs";
import path from "path";

const __dirname = path.resolve();

const tempFiles = path.resolve(__dirname, "temp", "images");
const imagesPath = path.resolve(__dirname, "public", "images");

export function deleteFile(fileName: string, temp: boolean) {
  if(temp) 
  fs.rmSync(`${tempFiles}/${fileName}`, {
    force: true
  });

  else 
  fs.rmSync(`${imagesPath}/${fileName}`, {
    force: true
  });
  
}

export function moveTempToImage(tempName: string, newName: string) {
  fs.rename(`${tempFiles}/${tempName}`, `${imagesPath}/${newName}`, () => {});
}



