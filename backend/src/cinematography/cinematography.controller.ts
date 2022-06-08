import { Body, Controller, Get, Post } from '@nestjs/common';
import { CinematographyService } from './cinematography.service';

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
  createCinematography(@Body() body) {
    return { id: Math.random(), ...body };
  }
}

// одно табло cinematography с type
