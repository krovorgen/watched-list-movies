import React, { useMemo } from 'react';
import dayjs from 'dayjs';
import ru from 'dayjs/locale/ru';
import { Typography } from '@alfalab/core-components/typography';
import { Table } from '@alfalab/core-components/table';
import { Button } from '@alfalab/core-components/button';
import { DeleteSWhiteIcon } from '@alfalab/icons-classic/DeleteSWhiteIcon';
import { EditMBlackIcon } from '@alfalab/icons-classic/EditMBlackIcon';

import kinopoisk from '../../assets/images/kinopoisk.webp';
import root from './films.json';
import { OkMColorIcon } from '@alfalab/icons-classic/OkMColorIcon';

import styles from './Films.module.scss';

type ContentType = {
  id: number;
  movie: string;
  rating: number;
  link: string;
  viewed: string;
  status: 'complete' | 'in-progress' | 'waiting';
};

type DataType = {
  films: ContentType[];
};

export const Films = () => {
  const moviesListMemo = useMemo(
    () =>
      (root as DataType).films.map((row) => (
        <Table.TRow className={styles.tr} key={row.id}>
          <Table.TCell>{row.movie}</Table.TCell>
          <Table.TCell>
            <span title="Просмотрено">
              <OkMColorIcon xlinkTitle="Просмотрено" />
            </span>
          </Table.TCell>
          <Table.TCell>{row.rating}</Table.TCell>
          <Table.TCell>
            <a className={styles.kinopoisk} href={row.link} target="_blank" rel="noreferrer">
              <img src={kinopoisk} width={20} height={20} alt="kinopoisk" />
            </a>
          </Table.TCell>
          <Table.TCell>{dayjs(row.viewed).locale(ru).format('DD MMMM YYYY')}</Table.TCell>
          <Table.TCell className={styles.nav}>
            <Button size="xxs" view="secondary" rightAddons={<EditMBlackIcon />} />
            <Button size="xxs" view="primary" rightAddons={<DeleteSWhiteIcon />} />
          </Table.TCell>
        </Table.TRow>
      )),
    [],
  );

  return (
    <>
      <Typography.Title view="xlarge" tag="h1" className={styles.title}>
        Список просмотренных фильмов
      </Typography.Title>
      <Button className={styles.add} block view="link">
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
          <Table.THeadCell width={200}>Управление</Table.THeadCell>
        </Table.THead>
        <Table.TBody>{root.films.length > 0 && moviesListMemo}</Table.TBody>
      </Table>
    </>
  );
};
