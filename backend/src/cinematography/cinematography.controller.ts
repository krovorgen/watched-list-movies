import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { CinematographyService } from './cinematography.service';
import { CreateCinematographyDto } from './dto/create-cinematography.dto';
import { UpdateCinematographyDto } from './dto/update-cinematography.dto';

@Controller('api/cinematography')
export class CinematographyController {
  constructor(private readonly cinematographyService: CinematographyService) {}

  @Get('/films')
  getFilms() {
    return this.cinematographyService.getFilms();
  }

  @Get('/serials')
  getSerials() {
    return this.cinematographyService.getSerials();
  }

  @Get('/cartoons')
  getCartoons() {
    return this.cinematographyService.getCartoons();
  }

  @Post()
  createCinematography(
    @Body() createCinematographyDto: CreateCinematographyDto,
  ) {
    return this.cinematographyService.createCinematography(
      createCinematographyDto,
    );
  }

  @Delete(':id')
  deleteCinematography(@Param('id') id: string) {
    return this.cinematographyService.deleteCinematography(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: ObjectId,
    @Body() updateCinematographyDto: UpdateCinematographyDto,
  ) {
    return this.cinematographyService.update(id, updateCinematographyDto);
  }
}
