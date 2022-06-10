import React, { FC, memo, SyntheticEvent, useCallback, useState } from 'react';
import { ModalResponsive } from '@alfalab/core-components/modal/responsive';
import { Button } from '@alfalab/core-components/button';
import { Input } from '@alfalab/core-components/input';
import { FieldProps, Select } from '@alfalab/core-components/select';
import { Field } from '@alfalab/core-components/select/components';

import { Rating, RatingValueType } from '../Rating';
import { DataType, iconStatus, StatusViewed } from '../../pages/Cinematography';
import { validateUrl } from '../../helpers/validateUrl';
import { catchHandler } from '../../helpers/catchHandler';
import { api } from '../../api/api';

import styles from './EditContentModal.module.scss';

type OptionsStatus = {
  key: string;
  content: string;
  icon: JSX.Element;
};

type Props = {
  isEditContentModal: boolean;
  handleEditContent: () => void;
  content: DataType;
};

export const EditContentModal: FC<Props> = memo(
  ({ isEditContentModal, handleEditContent, content }) => {
    const [ratingValue, setRatingValue] = useState<RatingValueType>(content.rating);
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

    const indexDefaultType = optionsStatus.findIndex((item) => item.key === content.status);
    const [selectedStatus, setSelectedStatus] = useState([optionsStatus[indexDefaultType]]);
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
          await api.update(content._id, {
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
      [content._id, handleEditContent, ratingValue],
    );
    return (
      <ModalResponsive open={isEditContentModal} onClose={handleEditContent} size="m">
        <ModalResponsive.Header hasCloser={true} />
        <ModalResponsive.Content>
          <form onSubmit={sendForm} className={styles.form}>
            <Input label="Название" name="title" defaultValue={content.title} required block />

            <Select
              label="Статус просмотра"
              options={optionsStatus}
              name="status"
              Field={CustomField}
              onChange={handleChangeStatus}
              selected={selectedStatus}
              block
            />

            <Input
              label="Комментарий к статусу"
              name="statusText"
              defaultValue={content.statusText}
              block
            />

            <Rating value={ratingValue} onClick={setRatingValue} />

            <Input
              label="Ссылка на kinopoisk"
              name="linkKinopoisk"
              defaultValue={content.linkKinopoisk}
              block
            />

            <Input
              label="Ссылка на tiktok"
              name="linkTikTok"
              defaultValue={content.linkTikTok}
              block
            />

            <Button view="primary" size="s" type="submit" loading={loadingBtn} block>
              Сохранить
            </Button>
          </form>
        </ModalResponsive.Content>
      </ModalResponsive>
    );
  },
);
