import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Cinematography,
  CinematographyDocument,
  CinematographyType,
} from '../schemas/cinematography.schema';
import { Model, ObjectId } from 'mongoose';
import { CreateCinematographyDto } from './dto/create-cinematography.dto';
import { UpdateCinematographyDto } from './dto/update-cinematography.dto';

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
      .find({ type: CinematographyType.cartoons })
      .exec();
  }

  async createCinematography(createCinematographyDto: CreateCinematographyDto) {
    return await new this.cinematographyRepository(
      createCinematographyDto,
    ).save();
  }

  async deleteCinematography(id: string) {
    return new this.cinematographyRepository({ _id: id }).delete();
  }

  async update(id: ObjectId, updateCinematographyDto: UpdateCinematographyDto) {
    const existingCinematography =
      await this.cinematographyRepository.findOneAndUpdate(
        { _id: id },
        { $set: updateCinematographyDto },
        { new: true },
      );
    if (!existingCinematography) {
      throw new NotFoundException(`Cinematography with id ${id} not found`);
    }
    return existingCinematography;
  }
}
