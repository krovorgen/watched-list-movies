import React, { FC, memo, SyntheticEvent, useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { ModalResponsive } from '@alfalab/core-components/modal/modern/responsive';
import { Button } from '@alfalab/core-components/button/modern';
import { Input } from '@alfalab/core-components/input/modern';
import { FieldProps, Select } from '@alfalab/core-components/select/modern';
import { Field } from '@alfalab/core-components/select/modern/components';

import { Rating, RatingValueType } from '../Rating';
import { iconStatus } from '../../pages/Cinematography';
import { validateUrl } from '../../helpers/validateUrl';
import { catchHandler } from '../../helpers/catchHandler';
import { api, CinematographyType, StatusViewed } from '../../api/api';

import styles from './AddContentModal.module.scss';
import { OptionsStatus } from '../../types/global';

type Props = {
  isAddContentModal: boolean;
  handleAddContent: () => void;
  currentType: CinematographyType;
};

export const AddContentModal: FC<Props> = memo(
  ({ isAddContentModal, handleAddContent, currentType }) => {
    const [ratingValue, setRatingValue] = useState<RatingValueType>(0);
    const [loadingBtn, setLoadingBtn] = useState(false);

    const CustomField = useCallback(
      (props: FieldProps) => (
        <Field {...props} leftAddons={props.selected && (props.selected as OptionsStatus).icon} />
      ),
      [],
    );
    const optionsStatus: OptionsStatus[] = [
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
    const [selectedStatus, setSelectedStatus] = useState([optionsStatus[0]]);
    const handleChangeStatus = useCallback(({ selectedMultiple }: any) => {
      setSelectedStatus(selectedMultiple);
    }, []);

    const optionsType = [
      { key: CinematographyType.films, content: 'Фильм' },
      { key: CinematographyType.serials, content: 'Сериал' },
      { key: CinematographyType.cartoons, content: 'Мультфильм' },
    ];
    const indexDefaultType = optionsType.findIndex((item) => item.key === currentType);
    const [selectedType, setSelectedType] = useState([optionsType[indexDefaultType]]);
    const handleChangeType = useCallback(({ selectedMultiple }: any) => {
      setSelectedType(selectedMultiple);
    }, []);

    const sendForm = useCallback(
      async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        const {
          type: { value: type },
          title: { value: title },
          status: { value: status },
          statusText: { value: statusText },
          linkKinopoisk: { value: linkKinopoisk },
          linkTikTok: { value: linkTikTok },
        } = e.currentTarget.elements as typeof e.currentTarget.elements & {
          type: { value: string };
          title: { value: string };
          status: { value: StatusViewed };
          statusText: { value: string };
          linkKinopoisk: { value: string };
          linkTikTok: { value: string };
        };

        if (linkTikTok !== '' && !validateUrl(linkTikTok)) return;
        if (linkKinopoisk !== '' && !validateUrl(linkKinopoisk)) return;

        try {
          setLoadingBtn(true);
          await api.create({
            type: type as CinematographyType,
            title,
            rating: ratingValue,
            linkKinopoisk,
            linkTikTok,
            status,
            statusText,
          });
          handleAddContent();
        } catch ({ response }) {
          catchHandler(response);
        } finally {
          toast('Создано');
          setLoadingBtn(false);
        }
      },
      [handleAddContent, ratingValue],
    );
    return (
      <ModalResponsive open={isAddContentModal} onClose={handleAddContent} size="m">
        <ModalResponsive.Header hasCloser={true} />
        <ModalResponsive.Content>
          <form onSubmit={sendForm} className={styles.form}>
            <Select
              options={optionsType}
              placeholder="Выберите тип"
              name="type"
              onChange={handleChangeType}
              selected={selectedType}
              block
            />

            <Input label="Название" name="title" required block />

            <Select
              label="Статус просмотра"
              options={optionsStatus}
              name="status"
              Field={CustomField}
              onChange={handleChangeStatus}
              selected={selectedStatus}
              block
            />

            <Input label="Комментарий к статусу" name="statusText" block />

            <Rating value={ratingValue} onClick={setRatingValue} />

            <Input label="Ссылка на kinopoisk" name="linkKinopoisk" block />

            <Input label="Ссылка на tiktok" name="linkTikTok" block />

            <Button view="primary" size="s" type="submit" loading={loadingBtn} block>
              Отправить
            </Button>
          </form>
        </ModalResponsive.Content>
      </ModalResponsive>
    );
  },
);
