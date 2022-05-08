import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Patient {
  @PrimaryColumn()
  Hospital: string;
  @PrimaryColumn()
  Id: number;
  @Column()
  MRN: number;
  @Column()
  IsAlive: boolean;
  @Column({ nullable: true })
  DeathDate: Date;
  @Column()
  FirstName: string;
  @Column()
  LastName: string;
  @Column()
  Gender: string;
  @Column()
  Sex: string;
  @Column({ nullable: true })
  City: string;
  @Column()
  State: string;
  @Column({ nullable: true })
  ZipCode: string;
  @Column({ nullable: true })
  LastModified: Date;
}
