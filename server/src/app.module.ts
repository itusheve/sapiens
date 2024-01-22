import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertiesModule } from './properties/properties.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'mongodb',
    url: 'mongodb+srv://itamarsando:itamars1986@itamar.tp4snqr.mongodb.net/sapiens-app?retryWrites=true&w=majority',
    entities: ["**/entities/*.js"],
    synchronize: true,
    ssl:true
  }),AuthModule, ConfigModule, PropertiesModule],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule { }
