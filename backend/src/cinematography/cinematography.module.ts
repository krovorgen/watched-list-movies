import { Module } from '@nestjs/common';
import { CinematographyController } from './cinematography.controller';
import { CinematographyService } from './cinematography.service';

@Module({
  controllers: [CinematographyController],
  providers: [CinematographyService],
})
export class CinematographyModule {}
