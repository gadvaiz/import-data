import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DataMapperFactory } from "./data-mapper-factory";
import { Patient } from "./entities/patient.entity";
import { Treatment } from "./entities/treatment.entity";
import { Hospital } from "./enums/hospitals.enum";
import { DataMapper } from "./interfaces/data-mapper.interface";
import * as csv from "csvtojson";

@Injectable()
export class AppService {
  constructor(
    private dataMapperFactory: DataMapperFactory,
    @InjectRepository(Patient)
    private patientsRepo: Repository<Patient>,
    @InjectRepository(Treatment)
    private treatmentRepo: Repository<Treatment>
  ) {}

  extractData(path: string) {
    return csv().fromFile(path);
  }

  async tranformDataAndSaveInDB(
    hospital: Hospital,
    treatments: any[],
    patients: any[]
  ) {
    const dataMapper: DataMapper =
      this.dataMapperFactory.getDataMapper(hospital);
    const tranformedTreatments = dataMapper.transformTreatments(treatments);
    const tranformedPatients = dataMapper.transformPatients(patients);
    await Promise.allSettled([
      this.savePatients(tranformedPatients),
      this.saveTreatments(tranformedTreatments),
    ]);
  }

  async saveTreatments(treatments: Treatment[]) {
    await this.treatmentRepo.save(treatments);
  }

  async savePatients(patients: Patient[]) {
    Logger.log("patients:", JSON.stringify(patients));
    await this.patientsRepo.save(patients);
  }
}
