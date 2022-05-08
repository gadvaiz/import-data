import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppService } from "./app.service";
import { DataMapperFactory } from "./data-mapper-factory";
import { DatabaseModule } from "./database/database.module";
import { Patient } from "./entities/patient.entity";
import { Treatment } from "./entities/treatment.entity";

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Patient, Treatment])],
  providers: [AppService, DataMapperFactory],
})
export class AppModule {}
