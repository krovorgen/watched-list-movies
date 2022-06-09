import { toast } from 'react-toastify';

export const catchHandler = (response: any) => {
  typeof response.data.message === 'object' &&
    response.data.message.map((item: string) => toast.error(item));
};
