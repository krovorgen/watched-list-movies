import axios, { AxiosInstance } from 'axios';
import { CinematographyType } from '../types/global';
import { configuration } from '../config/configuration';

class Api {
  private readonly instance: AxiosInstance = axios.create({
    baseURL: configuration().REACT_APP_BACKEND_URL,
  });
  get(currentType: CinematographyType) {
    return this.instance.get(`/${currentType}`);
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

type CreateCinematographyDtoType = {
  type: CinematographyType;
  title: string;
  rating: number;
  linkKinopoisk: string;
  linkTikTok: string;
  status: string;
  statusText: string;
};

type UpdateCinematographyDtoType = {
  title: string;
  rating: number;
  linkKinopoisk: string;
  linkTikTok: string;
  status: string;
  statusText: string;
};

export const api = new Api();
