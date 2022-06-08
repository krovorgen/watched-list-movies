import { IsDate, IsEnum, IsNumber, IsString } from 'class-validator';
import {
  CinematographyType,
  StatusViewed,
} from '../../schemas/cinematography.schema';

export class CreateCinematographyDto {
  @IsEnum(CinematographyType)
  readonly type: CinematographyType;

  @IsString()
  readonly title: string;

  @IsNumber()
  readonly rating: number;

  @IsString()
  readonly linkKinopoisk: string;

  @IsString()
  readonly linkTikTok: string;

  @IsDate()
  readonly viewed: Date;

  @IsEnum(StatusViewed)
  readonly status: StatusViewed;

  @IsString()
  readonly statusText: string;
}
