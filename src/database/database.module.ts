import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigService, ConfigModule } from "@nestjs/config";
import { Patient } from "src/entities/patient.entity";
import { Treatment } from "src/entities/treatment.entity";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "mysql",
        port: configService.get<number>("MY_SQL_PORT", 3306),
        host: configService.get<string>("MY_SQL_HOST", "mysql"),
        username: configService.get("MY_SQL_USERNAME", "root"),
        password: configService.get("MY_SQL_PASSWORD", "root"),
        database: configService.get("MY_SQL_DATABASE", "hospitals-data"),
        entities: [Patient, Treatment],
        synchronize: true,
        timezone: "Z",
      }),
    })
  ],
})
export class DatabaseModule {}
