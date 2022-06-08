import React, { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
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

import kinopoisk from '../../assets/images/kinopoisk.webp';
import tiktok from '../../assets/images/tiktok.svg';
import { AddContentModal } from '../../components/AddContentModal';

import styles from './Films.module.scss';

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

type DataType = {
  id: number;
  title: string;
  rating: number;
  linkKinopoisk: string;
  linkTikTok: string;
  viewed: string;
  status: StatusViewed;
  statusText: string;
};

export const Films = () => {
  const [root, setRoot] = useState<DataType[]>([]);

  const [isAddContentModal, setIsAddContentModal] = useState(false);
  const handleAddContent = useCallback(() => setIsAddContentModal((v) => !v), []);

  const moviesListMemo = useMemo(
    () =>
      root.map((row) => (
        <Table.TRow className={styles.tr} key={row.id}>
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
            <Button size="xxs" view="secondary" rightAddons={<EditMBlackIcon />} />
            <Button size="xxs" view="primary" rightAddons={<DeleteSWhiteIcon />} />
          </Table.TCell>
        </Table.TRow>
      )),
    [root],
  );

  useEffect(() => {
    (async () => {
      const res = await axios.get(`http://localhost:4000/api/cinematography/films`);
      setRoot(res.data);
    })();
  }, []);

  return (
    <>
      <Typography.Title view="xlarge" tag="h1" className={styles.title}>
        Список просмотренных фильмов
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
        <Table.TBody>{root.length > 0 && moviesListMemo}</Table.TBody>
      </Table>
      <AddContentModal isAddContentModal={isAddContentModal} handleAddContent={handleAddContent} />
    </>
  );
};
