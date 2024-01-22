import { PropertiesService } from './properties.service';
export declare class PropertiesController {
    private readonly propertyService;
    constructor(propertyService: PropertiesService);
    getAllProperties(request: any, response: any): Promise<void>;
}
