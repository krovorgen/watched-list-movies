import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Cinematography,
  CinematographyDocument,
  CinematographyType,
} from '../schemas/cinematography.schema';
import { Model } from 'mongoose';
import { CreateCinematographyDto } from './dto/create-cinematography.dto';

@Injectable()
export class CinematographyService {
  constructor(
    @InjectModel(Cinematography.name)
    private cinematographyRepository: Model<CinematographyDocument>,
  ) {}

  async getFilms(): Promise<Cinematography[]> {
    return await this.cinematographyRepository
      .find({ type: CinematographyType.films })
      .exec();
  }

  async getSerials(): Promise<Cinematography[]> {
    return await this.cinematographyRepository
      .find({ type: CinematographyType.serials })
      .exec();
  }

  async getCartoons(): Promise<Cinematography[]> {
    return await this.cinematographyRepository
      .find({ type: CinematographyType.cartoon })
      .exec();
  }

  async createCinematography(createCinematographyDto: CreateCinematographyDto) {
    return await new this.cinematographyRepository(
      createCinematographyDto,
    ).save();
  }
}
