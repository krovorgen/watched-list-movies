import { Module } from '@nestjs/common';
import { CinematographyModule } from './cinematography/cinematography.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${configuration().database.MONGO_LOGIN}:${
        configuration().database.MONGO_PASSWORD
      }@cluster0.xfsdhvt.mongodb.net/test?retryWrites=true&w=majority`,
    ),
    CinematographyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
