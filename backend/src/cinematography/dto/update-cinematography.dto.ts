import { IsEnum, IsNumber, IsString } from 'class-validator';
import { StatusViewed } from '../../schemas/cinematography.schema';

export class UpdateCinematographyDto {
  @IsString()
  readonly title: string;

  @IsNumber()
  readonly rating: number;

  @IsString()
  readonly linkKinopoisk: string;

  @IsString()
  readonly linkTikTok: string;

  @IsEnum(StatusViewed)
  readonly status: StatusViewed;

  @IsString()
  readonly statusText: string;
}
