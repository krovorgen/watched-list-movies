import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Cinematography,
  CinematographyDocument,
  CinematographyType,
} from '../schemas/cinematography.schema';
import { Model } from 'mongoose';

@Injectable()
export class CinematographyService {
  constructor(
    @InjectModel(Cinematography.name)
    private cinematographyModel: Model<CinematographyDocument>,
  ) {}

  async getFilms(): Promise<Cinematography[]> {
    return await this.cinematographyModel
      .find({ type: CinematographyType.films })
      .exec();
  }

  async getSerials(): Promise<Cinematography[]> {
    return await this.cinematographyModel
      .find({ type: CinematographyType.serials })
      .exec();
  }

  async getCartoons(): Promise<Cinematography[]> {
    return await this.cinematographyModel
      .find({ type: CinematographyType.cartoon })
      .exec();
  }
}
