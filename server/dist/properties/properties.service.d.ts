import { Repository } from 'typeorm';
import { Property } from './entities/property.entity';
export declare class PropertiesService {
    private readonly propertyRepository;
    constructor(propertyRepository: Repository<Property>);
    getAll(): Promise<Property[]>;
}
