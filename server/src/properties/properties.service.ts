import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOperator, ObjectLiteral, Repository } from "typeorm";
import { Property } from "./entities/property.entity";

@Injectable()
export class PropertiesService {
  /**
   *
   */
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>
  ) {}

  async getAll() {
    try {
      let results = await this.propertyRepository.find({});
      return results;
    } catch (e) {
      throw e;
    }
  }
}
