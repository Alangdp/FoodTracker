// TODO - SISTEMA DE APAGAR E MOVER IMAGENS BASEADO NO STATUS DA CRIACAO

import fs from "fs";
import path from "path";

const __dirname = path.resolve();

type TempFilesProps = {
  tempFolder: string[]
  concreteFolder: string[]
}

export class TempFiles {
  private concreteFolder: string;
  private tempFolder: string;

  /**
   * @concretePath starts On __dirname/"public"
   * @tempFiles starts On __dirname/"temp"
   */
  constructor({ concreteFolder , tempFolder }: TempFilesProps) {
    this.concreteFolder = path.resolve(...[__dirname, "public"].concat(concreteFolder));
    this.tempFolder = path.resolve(...[__dirname, "temp"].concat(tempFolder));

  }

  deleteConcreteFile(fileName: string) {
    fs.rmSync(`${this.concreteFolder}/${fileName}`, {
      force: true
    });
  }

  deleteTempFile(fileName: string) {
    fs.rmSync(`${this.tempFolder}/${fileName}`, {
      force: true
    });
  }
  
  ToConcrete(tempName: string, newName: string) {
    fs.rename(`${this.tempFolder}/${tempName}`, `${this.concreteFolder}/${newName}`, () => {});
  }
}

const imagesManager = new TempFiles({
  concreteFolder: ['images'],
  tempFolder: ['images']
});

export { imagesManager };