import React, { FC, memo, useState } from 'react';
import { ModalResponsive } from '@alfalab/core-components/modal/responsive';
import { Button } from '@alfalab/core-components/button';
import { Input } from '@alfalab/core-components/input';
import { CalendarInput } from '@alfalab/core-components/calendar-input';
import dayjs from 'dayjs';
import { Rating, RatingValueType } from '../Rating';

type Props = {
  isAddContentModal: boolean;
  handleAddContent: () => void;
};

export const AddContentModal: FC<Props> = memo(({ isAddContentModal, handleAddContent }) => {
  const [ratingValue, setRatingValue] = useState<RatingValueType>(0);

  const [calendarValue, setCalendarValue] = useState(dayjs(new Date()).format('DD.MM.YYYY'));
  const calendarHandleChange = (_: any, { value }: { value: string }) => {
    setCalendarValue(value);
    console.log(dayjs(ratingValue, 'DD.MM.YYYY').toDate());
  };
  const sendForm = () => {
    handleAddContent();
  };
  return (
    <ModalResponsive open={isAddContentModal} onClose={handleAddContent} size="m">
      <ModalResponsive.Header hasCloser={true} />
      <ModalResponsive.Content>
        <Input label="Название" name="email" block />
        <CalendarInput block value={calendarValue} onChange={calendarHandleChange} />
        <Rating value={ratingValue} onClick={setRatingValue} />
      </ModalResponsive.Content>
      <ModalResponsive.Footer>
        <Button view="primary" size="s" onClick={sendForm} block>
          Отправить
        </Button>
      </ModalResponsive.Footer>
    </ModalResponsive>
  );
});
