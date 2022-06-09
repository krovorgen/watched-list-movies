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
}

export const api = new Api();
