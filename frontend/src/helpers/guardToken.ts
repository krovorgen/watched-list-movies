import { configuration } from '../config/configuration';

export const isCorrectGuardToken = () => {
  return localStorage.getItem('token') === configuration().token;
};
