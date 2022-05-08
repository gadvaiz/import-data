import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Treatment {
  @PrimaryColumn()
  Hospital: string;
  @PrimaryColumn()
  PatientID: number;
  @PrimaryColumn()
  TreatmentID: string;
  @Column()
  StartDate: Date;
  @Column({ nullable: true })
  EndDate: Date;
  @Column()
  Status: string;
  @Column()
  DisplayName: string;
  @Column({ nullable: true })
  Diagnoses: string;
  @Column()
  CyclesXDays: string;
}