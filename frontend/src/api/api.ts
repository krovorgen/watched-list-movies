import axios, { AxiosInstance } from 'axios';
import { configuration } from '../config/configuration';

class Api {
  private readonly instance: AxiosInstance = axios.create({
    baseURL: configuration().REACT_APP_BACKEND_URL,
  });
  get(currentType: CinematographyType) {
    return this.instance.get<DataType[]>(`/${currentType}`);
  }
  delete(id: string) {
    return this.instance.delete(`/${id}`);
  }
  create(createCinematographyDtoType: CreateCinematographyDtoType) {
    return this.instance.post(`/`, createCinematographyDtoType);
  }
  update(id: string, updateCinematographyDto: UpdateCinematographyDtoType) {
    return this.instance.patch(`/${id}`, updateCinematographyDto);
  }
}

export type DataType = {
  _id: string;
  type: CinematographyType;
  title: string;
  rating: number;
  linkKinopoisk: string;
  linkTikTok: string;
  status: StatusViewed;
  statusText: string;
};

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

type CreateCinematographyDtoType = {
  type: CinematographyType;
  title: string;
  rating: number;
  linkKinopoisk: string;
  linkTikTok: string;
  status: StatusViewed;
  statusText: string;
};

type UpdateCinematographyDtoType = {
  title: string;
  rating: number;
  linkKinopoisk: string;
  linkTikTok: string;
  status: StatusViewed;
  statusText: string;
};

export const api = new Api();
