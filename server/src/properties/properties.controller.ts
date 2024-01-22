import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import * as jwt from 'jsonwebtoken';


@Controller('properties')
export class PropertiesController {
    constructor(private readonly propertyService: PropertiesService) { }

    @Get()
    // @UseGuards(AuthGuard('jwt'))
    async getAllProperties(@Req() request: any, @Res() response: any) {
        try {
            const user:any = jwt.decode(request.cookies['access_token']);
            let results  =  await this.propertyService.getAll();
            if(user.role === 'admin'){
                
                response.json(results);
                return;
            }
            console.log(user.id);
            results =results.filter((item)=>item.buyerID==user.id || item.buyerID==null);
            response.json(results);

          
        } catch (error) {
            response.status(500).json({ message: `error in properies ${error}` })
        }

    }
}
