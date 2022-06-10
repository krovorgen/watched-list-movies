import React, { FC, memo, SyntheticEvent, useCallback, useState } from 'react';
import { ModalResponsive } from '@alfalab/core-components/modal/responsive';
import { Button } from '@alfalab/core-components/button';
import { Input } from '@alfalab/core-components/input';
import { FieldProps, Select } from '@alfalab/core-components/select';
import { Field } from '@alfalab/core-components/select/components';

import { Rating, RatingValueType } from '../Rating';
import { iconStatus, StatusViewed } from '../../pages/Cinematography';
import { validateUrl } from '../../helpers/validateUrl';
import { CinematographyType } from '../../types/global';
import { catchHandler } from '../../helpers/catchHandler';

import styles from './EditContentModal.module.scss';
import { api } from '../../api/api';

type OptionsStatus = {
  key: string;
  content: string;
  icon: JSX.Element;
};

type Props = {
  isEditContentModal: boolean;
  handleEditContent: () => void;
  currentType: CinematographyType;
};

export const EditContentModal: FC<Props> = memo(
  ({ isEditContentModal, handleEditContent, currentType }) => {
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

    const sendForm = useCallback(
      async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        const {
          title: { value: title },
          status: { value: status },
          statusText: { value: statusText },
          linkKinopoisk: { value: linkKinopoisk },
          linkTikTok: { value: linkTikTok },
        } = e.currentTarget.elements as typeof e.currentTarget.elements & {
          title: { value: string };
          status: { value: string };
          statusText: { value: string };
          linkKinopoisk: { value: string };
          linkTikTok: { value: string };
        };

        if (linkTikTok !== '') validateUrl(linkTikTok);
        if (linkKinopoisk !== '') validateUrl(linkKinopoisk);

        try {
          setLoadingBtn(true);
          await api.update('1', {
            title,
            rating: ratingValue,
            linkKinopoisk,
            linkTikTok,
            status,
            statusText,
          });
          handleEditContent();
        } catch ({ response }) {
          catchHandler(response);
        } finally {
          setLoadingBtn(false);
        }
      },
      [handleEditContent, ratingValue],
    );
    return (
      <ModalResponsive open={isEditContentModal} onClose={handleEditContent} size="m">
        <ModalResponsive.Header hasCloser={true} />
        <ModalResponsive.Content>
          <form onSubmit={sendForm} className={styles.form}>
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
              Сохранить
            </Button>
          </form>
        </ModalResponsive.Content>
      </ModalResponsive>
    );
  },
);
