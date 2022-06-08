import { Module } from '@nestjs/common';
import { CinematographyModule } from './cinematography/cinematography.module';

@Module({
  imports: [CinematographyModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
