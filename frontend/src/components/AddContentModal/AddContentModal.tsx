import React, { FC, memo, SyntheticEvent, useState } from 'react';
import axios from 'axios';
import { ModalResponsive } from '@alfalab/core-components/modal/responsive';
import { Button } from '@alfalab/core-components/button';
import { Input } from '@alfalab/core-components/input';
import { CalendarInput } from '@alfalab/core-components/calendar-input';
import { FieldProps, Select } from '@alfalab/core-components/select';
import { Field } from '@alfalab/core-components/select/components';
import dayjs from 'dayjs';

import { Rating, RatingValueType } from '../Rating';
import { iconStatus, StatusViewed } from '../../pages/Films';
import { validateUrl } from '../../helpers/validateUrl';

import styles from './AddContentModal.module.scss';

type OptionsStatus = {
  key: string;
  content: string;
  icon: JSX.Element;
};

type Props = {
  isAddContentModal: boolean;
  handleAddContent: () => void;
};

export const AddContentModal: FC<Props> = memo(({ isAddContentModal, handleAddContent }) => {
  const [ratingValue, setRatingValue] = useState<RatingValueType>(0);

  const [calendarValue, setCalendarValue] = useState(dayjs(new Date()).format('DD.MM.YYYY'));
  const calendarHandleChange = (_: any, { value }: { value: string }) => {
    setCalendarValue(value);
  };

  const CustomField = (props: FieldProps) => (
    <Field {...props} leftAddons={props.selected && (props.selected as OptionsStatus).icon} />
  );
  const options: OptionsStatus[] = [
    {
      key: StatusViewed.complete,
      content: 'Просмотрено',
      icon: iconStatus[StatusViewed.complete],
    },
    {
      key: StatusViewed.inProgress,
      content: 'В процессе',
      icon: iconStatus[StatusViewed.inProgress],
    },
    {
      key: StatusViewed.waiting,
      content: 'Не начато',
      icon: iconStatus[StatusViewed.waiting],
    },
  ];
  const [selected, setSelected] = React.useState([options[0]]);
  const handleChange = ({ selectedMultiple }: any) => {
    setSelected(selectedMultiple);
  };

  const sendForm = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { title, status, statusText, linkKinopoisk, linkTikTok } = e.currentTarget
      .elements as typeof e.currentTarget.elements & {
      title: { value: string };
      status: { value: string };
      statusText: { value: string };
      linkKinopoisk: { value: string };
      linkTikTok: { value: string };
    };

    if (linkTikTok.value !== '') validateUrl(linkTikTok.value);
    if (linkKinopoisk.value !== '') validateUrl(linkKinopoisk.value);

    await axios.post(`http://localhost:4000/api/cinematography`, {
      title: title.value,
      rating: ratingValue,
      linkKinopoisk: linkKinopoisk.value,
      linkTikTok: linkTikTok.value,
      viewed: dayjs(calendarValue, 'DD.MM.YYYY').toDate(),
      status: status.value,
      statusText: statusText.value,
    });
  };
  return (
    <ModalResponsive open={isAddContentModal} onClose={handleAddContent} size="m">
      <ModalResponsive.Header hasCloser={true} />
      <ModalResponsive.Content>
        <form onSubmit={sendForm} className={styles.form}>
          <Input label="Название" name="title" required block />

          <Select
            label="Статус просмотра"
            options={options}
            name="status"
            Field={CustomField}
            onChange={handleChange}
            selected={selected}
            block
          />

          <Input label="Комментарий к статусу" name="statusText" block />

          <Rating value={ratingValue} onClick={setRatingValue} />

          <Input label="Ссылка на kinopoisk" name="linkKinopoisk" block />

          <Input label="Ссылка на tiktok" name="linkTikTok" block />

          <CalendarInput value={calendarValue} onChange={calendarHandleChange} block />

          <Button view="primary" size="s" type="submit" block>
            Отправить
          </Button>
        </form>
      </ModalResponsive.Content>
    </ModalResponsive>
  );
});
