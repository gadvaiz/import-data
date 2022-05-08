import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import { Hospital } from './enums/hospitals.enum';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const appService = app.get<AppService>(AppService);
  //get path from config file
  const treatments1FilePath = process.env.TREATMENTS1_FILE_PATH;
  const treatments2FilePath = process.env.TREATMENTS2_FILE_PATH;

  const patients1FilePath = process.env.PATIENTS1_FILE_PATH;
  const patients2FilePath = process.env.PATIENTS2_FILE_PATH;

  const hospitalName1 = process.env.HOSPITAL_NAME1 as Hospital;
  const hospitalName2 = process.env.HOSPITAL_NAME2 as Hospital;

  const patients1RelativePath = path.resolve('src', patients1FilePath);
  const patients2RelativePath = path.resolve('src', patients2FilePath);

  const treaments1RelativePath = path.resolve("src", treatments1FilePath);
  const treaments2RelativePath = path.resolve("src", treatments2FilePath);

  const patients1 = await appService.extractData(patients1RelativePath);
  const patients2 = await appService.extractData(patients2RelativePath);

  const treatments1 = await appService.extractData(treaments1RelativePath);
  const treatments2 = await appService.extractData(treaments2RelativePath);

  await appService.tranformDataAndSaveInDB(hospitalName1, treatments1, patients1);
  await appService.tranformDataAndSaveInDB(hospitalName2, treatments2, patients2);
  await app.close();
}
bootstrap();
