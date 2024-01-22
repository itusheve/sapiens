import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PropertiesController } from './properties.controller';
import { PropertiesService } from './properties.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import { AuthMiddleware } from 'src/auth/auth.middleware';

@Module({
  imports:[  TypeOrmModule.forFeature([Property])],
  controllers: [PropertiesController],
  providers: [PropertiesService],
  exports:[PropertiesService]
})
export class PropertiesModule  {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(AuthMiddleware).forRoutes('properties');
  // }
}
