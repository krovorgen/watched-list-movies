import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CinematographyDocument = Cinematography & Document;

export enum StatusViewed {
  complete = 'complete',
  inProgress = 'inProgress',
  waiting = 'waiting',
}

export enum CinematographyType {
  films = 'films',
  serials = 'serials',
  cartoons = 'cartoons',
}

@Schema()
export class Cinematography {
  @Prop({ default: CinematographyType.films })
  type: CinematographyType;

  @Prop({ required: true })
  title: string;

  @Prop({ default: 0 })
  rating: number;

  @Prop({ default: '' })
  linkKinopoisk: string;

  @Prop({ default: '' })
  linkTikTok: string;

  @Prop({ default: new Date() })
  viewed: Date;

  @Prop({ default: StatusViewed.complete })
  status: StatusViewed;

  @Prop({ default: '' })
  statusText: string;
}

export const CinematographySchema =
  SchemaFactory.createForClass(Cinematography);
