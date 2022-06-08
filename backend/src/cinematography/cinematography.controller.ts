import { Body, Controller, Get, Post } from '@nestjs/common';
import { CinematographyService } from './cinematography.service';
import { CreateCinematographyDto } from './dto/create-cinematography.dto';

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
}

// одно табло cinematography с type
