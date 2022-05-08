import { Hospital1DataMapper } from "./data-mappers/hospital1-data-mapper";
import { Hospital2DataMapper } from "./data-mappers/hospital2-data-mapper";
import { Hospital } from "./enums/hospitals.enum";
import { DataMapper } from "./interfaces/data-mapper.interface";

export class DataMapperFactory {
  getDataMapper(hospital: Hospital): DataMapper {
    switch (hospital) {
      case Hospital.Hospital1:
        return new Hospital1DataMapper();
      case Hospital.Hospital2:
        return new Hospital2DataMapper();
      default:
        throw new Error(`dataMapper for hospital ${hospital} does not exist`);
    }
  }
}
