import { Module } from '@nestjs/common';
import { CinematographyController } from './cinematography.controller';
import { CinematographyService } from './cinematography.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Cinematography,
  CinematographySchema,
} from '../schemas/cinematography.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Cinematography.name, schema: CinematographySchema },
    ]),
  ],
  controllers: [CinematographyController],
  providers: [CinematographyService],
})
export class CinematographyModule {}
