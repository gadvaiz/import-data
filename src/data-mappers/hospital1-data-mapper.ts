import { Logger } from "@nestjs/common";
import { Hospital } from "src/enums/hospitals.enum";
import { Patient } from "../entities/patient.entity";
import { Treatment } from "../entities/treatment.entity";
import { IsDeceased } from "../enums/hospital1-is-deceased";
import { Hospital1Patient } from "../enums/hospital1-patient.enum";
import { Hospital1Treatment } from "../enums/hospital1-treatment.enum";
import { DataMapper } from "../interfaces/data-mapper.interface";

export class Hospital1DataMapper implements DataMapper {
  transformPatients(data: any[]): Patient[] {
    return data.map((p) => {
      // Here we transform data to desired schema (Fields and Data).
      const IsPatientAlive =
        p[Hospital1Patient.IsAlive] !== IsDeceased.Deceased ? true : false;
        Logger.log("ch isAlive", p[Hospital1Patient.IsAlive]);
      return {
        Hospital: Hospital.Hospital1,
        Id: p[Hospital1Patient.Id],
        MRN: p[Hospital1Patient.MRN],
        IsAlive: IsPatientAlive,
        State: p[Hospital1Patient.State],
        DeathDate: p[Hospital1Patient.DeathDate],
        FirstName: p[Hospital1Patient.FirstName],
        LastName: p[Hospital1Patient.LastName],
        Sex: p[Hospital1Patient.Sex],
        Gender: p[Hospital1Patient.Gender],
        City: p[Hospital1Patient.City],
        ZipCode: p[Hospital1Patient.ZipCode],
        LastModified: p[Hospital1Patient.LastModifiedDate],
      } as Patient;
    });
  }

  transformTreatments(data: any[]): Treatment[] {
    return data.map((treatment) => {
      // Here we transform data to desired schema (Fields and Data).
      const status =
        treatment[Hospital1Treatment.Status] === "Ordered"
          ? "Active"
          : "Not Active";
      return {
        Hospital: Hospital.Hospital1,
        PatientID: treatment[Hospital1Treatment.PatientID],
        TreatmentID: treatment[Hospital1Treatment.TreatmentID],
        StartDate: treatment[Hospital1Treatment.StartDate],
        EndDate: treatment[Hospital1Treatment.EndDate],
        Diagnoses: treatment[Hospital1Treatment.Diagnoses],
        Status: status,
        DisplayName: treatment[Hospital1Treatment.DisplayName],
        CyclesXDays: treatment[Hospital1Treatment.NumberOfCycles],
      } as Treatment;
    });
  }
}
