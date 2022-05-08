import { Hospital } from "src/enums/hospitals.enum";
import { Patient } from "../entities/patient.entity";
import { Treatment } from "../entities/treatment.entity";
import { IsDeceased } from "../enums/hospital1-is-deceased";
import { Hospital2Patient } from "../enums/hospital2-patient.enum";
import { Hospital2Treatment } from "../enums/hospital2-treatment.enum";
import { DataMapper } from "../interfaces/data-mapper.interface";

export class Hospital2DataMapper implements DataMapper {
  transformPatients(data: any[]): Patient[] {
    return data.map((p) => {
      // Here we transform data to desired schema (Fields and Data).
      const IsAlive =
        p[Hospital2Patient.IsAlive] === 'N' ? true : false;
      return {
        Hospital: Hospital.Hospital2,
        Id: p[Hospital2Patient.Id],
        MRN: p[Hospital2Patient.MRN],
        IsAlive: IsAlive,
        State: p[Hospital2Patient.State],
        DeathDate: p[Hospital2Patient.DeathDate],
        FirstName: p[Hospital2Patient.FirstName],
        LastName: p[Hospital2Patient.LastName],
        Sex: p[Hospital2Patient.Sex],
        Gender: p[Hospital2Patient.Gender],
        City: p[Hospital2Patient.City],
        ZipCode: p[Hospital2Patient.ZipCode],
        LastModified: p[Hospital2Patient.LastModifiedDate],
      } as Patient;
    });
  }

  transformTreatments(data: any[]): Treatment[] {
    return data.map((treatment) => {
      // Here we transform data to desired schema (Fields and Data).
      const status =
        treatment[Hospital2Treatment.Status] !== "Active"
          ? "Not Active"
          : "Active";
      return {
        Hospital: Hospital.Hospital2,
        PatientID: treatment[Hospital2Treatment.PatientID],
        TreatmentID: treatment[Hospital2Treatment.TreatmentID],
        StartDate: treatment[Hospital2Treatment.StartDate],
        EndDate: treatment[Hospital2Treatment.EndDate],
        Diagnoses: treatment[Hospital2Treatment.Diagnoses],
        Status: status,
        DisplayName: treatment[Hospital2Treatment.DisplayName],
        CyclesXDays: treatment[Hospital2Treatment.NumberOfCycles],
      } as Treatment;
    });
  }
}
