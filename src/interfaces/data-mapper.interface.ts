import { Injectable } from "@nestjs/common";
import { Patient } from "../entities/patient.entity";
import { Treatment } from "../entities/treatment.entity";

export interface DataMapper {
  transformPatients(data: any): Patient[];

  transformTreatments(data: any): Treatment[];
}
