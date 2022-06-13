import { toast } from 'react-toastify';

export const validateUrl = (url: string) => {
  const expression =
    /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi;
  const regex = new RegExp(expression);
  const isCorrectUrl = url.match(regex);
  if (!isCorrectUrl) toast.error(`Неверная ссылка ${url}`);
  return isCorrectUrl;
};
