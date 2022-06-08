import { toast } from 'react-toastify';

export const validateUrl = (url: string) => {
  const expression =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  const regex = new RegExp(expression);
  if (!url.match(regex)) toast.error(`Неверная ссылка ${url}`);
};
