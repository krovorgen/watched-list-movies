import React, { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import ru from 'dayjs/locale/ru';
import { Typography } from '@alfalab/core-components/typography';
import { Tooltip } from '@alfalab/core-components/tooltip';
import { Button } from '@alfalab/core-components/button';
import { Table } from '@alfalab/core-components/table';
import { AttentionMColorIcon } from '@alfalab/icons-classic/AttentionMColorIcon';
import { DeleteSWhiteIcon } from '@alfalab/icons-classic/DeleteSWhiteIcon';
import { CancelMColorIcon } from '@alfalab/icons-classic/CancelMColorIcon';
import { EditMBlackIcon } from '@alfalab/icons-classic/EditMBlackIcon';
import { OkMColorIcon } from '@alfalab/icons-classic/OkMColorIcon';

import { AddContentModal } from '../../components/AddContentModal';
import kinopoisk from '../../assets/images/kinopoisk.webp';
import tiktok from '../../assets/images/tiktok.svg';
import { CinematographyType } from '../../types/global';
import { catchHandler } from '../../helpers/catchHandler';
import { api } from '../../api/api';
import { GoHome } from '../../components/GoHome';
import { EditContentModal } from '../../components/EditContentModal';

import styles from './Cinematography.module.scss';

export enum StatusViewed {
  complete = 'complete',
  inProgress = 'inProgress',
  waiting = 'waiting',
}

export const iconStatus = {
  complete: <OkMColorIcon />,
  inProgress: <AttentionMColorIcon />,
  waiting: <CancelMColorIcon />,
};

export type DataType = {
  _id: string;
  type: CinematographyType;
  title: string;
  rating: number;
  linkKinopoisk: string;
  linkTikTok: string;
  viewed: string;
  status: StatusViewed;
  statusText: string;
};

type Props = {
  currentType: CinematographyType;
  title: string;
};

export const Cinematography: FC<Props> = memo(({ currentType, title }) => {
  const [content, setContent] = useState<DataType[]>([]);
  const [currentRow, setCurrentRow] = useState<DataType | null>(null);

  const [isAddContentModal, setIsAddContentModal] = useState(false);
  const handleAddContent = useCallback(() => setIsAddContentModal((v) => !v), []);

  const [isEditContentModal, setIsEditContentModal] = useState(false);
  const handleEditContent = useCallback(() => {
    setIsEditContentModal((v) => !v);
  }, []);

  const editCinematography = useCallback(
    (row: DataType) => {
      setCurrentRow(row);
      handleEditContent();
    },
    [handleEditContent],
  );

  const deleteCinematography = useCallback(async (id: string) => {
    let result = window.confirm(`question`);
    if (!result) return;
    try {
      await api.delete(id);
      setContent((v) => v.filter((item) => item._id !== id));
    } catch ({ response }) {
      catchHandler(response);
    } finally {
      toast('Удалено');
    }
  }, []);

  useEffect(() => {
    if (currentRow && !isEditContentModal) setCurrentRow(null);
  }, [currentRow, isEditContentModal]);

  const moviesListMemo = useMemo(
    () =>
      content.length > 0 &&
      content.map((row) => (
        <Table.TRow className={styles.tr} key={row._id}>
          <Table.TCell>{row.title}</Table.TCell>
          <Table.TCell>
            <Tooltip
              content={row.statusText}
              position="top"
              view="hint"
              targetClassName={styles.tooltip}>
              {iconStatus[row.status]}
            </Tooltip>
          </Table.TCell>
          <Table.TCell>{row.rating}</Table.TCell>
          <Table.TCell>
            {row.linkKinopoisk ? (
              <a className={styles.link} href={row.linkKinopoisk} target="_blank" rel="noreferrer">
                <img src={kinopoisk} width={20} height={20} alt="kinopoisk" />
              </a>
            ) : null}
            {row.linkTikTok ? (
              <a className={styles.link} href={row.linkTikTok} target="_blank" rel="noreferrer">
                <img src={tiktok} width={20} height={20} alt="tiktok" />
              </a>
            ) : null}
          </Table.TCell>
          <Table.TCell>{dayjs(row.viewed).locale(ru).format('DD MMMM YYYY')}</Table.TCell>
          <Table.TCell className={styles.nav}>
            <Button
              size="xxs"
              view="secondary"
              onClick={() => editCinematography(row)}
              rightAddons={<EditMBlackIcon />}
            />
            <Button
              size="xxs"
              view="primary"
              rightAddons={<DeleteSWhiteIcon />}
              onClick={() => deleteCinematography(row._id)}
            />
          </Table.TCell>
        </Table.TRow>
      )),
    [content, editCinematography, deleteCinematography],
  );

  useEffect(() => {
    (async () => {
      const res = await api.get(currentType);
      setContent(res.data);
    })();
  }, [isAddContentModal, isEditContentModal, currentType]);

  return (
    <>
      <GoHome />
      <Typography.Title view="xlarge" tag="h1" className={styles.title}>
        {title}
      </Typography.Title>
      <Button className={styles.add} block view="link" onClick={handleAddContent}>
        Добавить
      </Button>
      <Table>
        <Table.THead>
          <Table.THeadCell>Название</Table.THeadCell>
          <Table.THeadCell width={100} textAlign="center">
            Статус
          </Table.THeadCell>
          <Table.THeadCell width={100} textAlign="center">
            Оценка
          </Table.THeadCell>
          <Table.THeadCell width={100} textAlign="center">
            Ссылка
          </Table.THeadCell>
          <Table.THeadCell width={150} textAlign="center">
            Просмотрен
          </Table.THeadCell>
          <Table.THeadCell width={150} textAlign="center">
            Управление
          </Table.THeadCell>
        </Table.THead>
        <Table.TBody>{content.length > 0 && moviesListMemo}</Table.TBody>
      </Table>
      <AddContentModal
        isAddContentModal={isAddContentModal}
        handleAddContent={handleAddContent}
        currentType={currentType}
      />
      {currentRow && (
        <EditContentModal
          isEditContentModal={isEditContentModal}
          handleEditContent={handleEditContent}
          content={currentRow}
        />
      )}
    </>
  );
});
