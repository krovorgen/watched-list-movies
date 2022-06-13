import React, { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { Typography } from '@alfalab/core-components/typography/modern';
import { Tooltip } from '@alfalab/core-components/tooltip/modern';
import { Button } from '@alfalab/core-components/button/modern';
import { Table } from '@alfalab/core-components/table/modern';
import AttentionMColorIcon from '@alfalab/icons-classic/AttentionMColorIcon';
import DeleteSWhiteIcon from '@alfalab/icons-classic/DeleteSWhiteIcon';
import CancelMColorIcon from '@alfalab/icons-classic/CancelMColorIcon';
import EditMBlackIcon from '@alfalab/icons-classic/EditMBlackIcon';
import OkMColorIcon from '@alfalab/icons-classic/OkMColorIcon';

import { AddContentModal } from '../../components/AddContentModal';
import kinopoisk from '../../assets/images/kinopoisk.webp';
import tiktok from '../../assets/images/tiktok.svg';
import { catchHandler } from '../../helpers/catchHandler';
import { api, CinematographyType, DataType } from '../../api/api';
import { GoHome } from '../../components/GoHome';
import { EditContentModal } from '../../components/EditContentModal';
import { GlobalLoader } from '../../components/GlobalLoader';
import { SearchForm } from '../../components/SearchForm';
import { isCorrectGuardToken } from '../../helpers/guardToken';

import styles from './Cinematography.module.scss';

export const iconStatus = {
  complete: <OkMColorIcon />,
  inProgress: <AttentionMColorIcon />,
  waiting: <CancelMColorIcon />,
};

type Props = {
  currentType: CinematographyType;
  title: string;
};

enum SortTableValue {
  rating = 'rating',
  type = 'type',
}

export enum SortTableType {
  complete = 0,
  inProgress = 1,
  waiting = 2,
}

const isCorrectToken = isCorrectGuardToken();

export const Cinematography: FC<Props> = memo(({ currentType, title }) => {
  const [searchValue, setSearchValue] = useState('');
  const [isLoadingContent, setIsLoadingContent] = useState(false);
  let [data, setData] = useState<DataType[]>([]);
  const [currentRow, setCurrentRow] = useState<DataType | null>(null);

  const [sortKey, setSortKey] = useState<SortTableValue | undefined>(undefined);
  const [isSortedDesc, setIsSortedDesc] = useState<boolean | undefined>(undefined);
  const handleSort = useCallback(
    (key: SortTableValue) => {
      setSortKey(key);
      if (isSortedDesc !== undefined) {
        setIsSortedDesc(!isSortedDesc ? undefined : false);
      } else {
        setIsSortedDesc(true);
      }
    },
    [isSortedDesc],
  );

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

  const deleteCinematography = useCallback(async (id: string, title: string) => {
    const result = window.confirm(`Удалить ${title}?`);
    if (!result) return;
    try {
      await api.delete(id);
      setData((v) => v.filter((item) => item._id !== id));
    } catch ({ response }) {
      catchHandler(response);
    } finally {
      toast('Удалено');
    }
  }, []);

  useEffect(() => {
    if (currentRow && !isEditContentModal) setCurrentRow(null);
  }, [currentRow, isEditContentModal]);

  if (searchValue.trim() !== '') {
    data = data.filter((article) =>
      article.title.toLowerCase().includes(searchValue.toLowerCase()),
    );
  }
  const sortedData = useMemo(() => {
    if (!sortKey || isSortedDesc === undefined) return data;
    return [...data].sort((a, b) => {
      if (sortKey === SortTableValue.rating) {
        return isSortedDesc ? b.rating - a.rating : a.rating - b.rating;
      }
      if (sortKey === SortTableValue.type) {
        return isSortedDesc
          ? SortTableType[b.status] - SortTableType[a.status]
          : SortTableType[a.status] - SortTableType[b.status];
      }
      return 0;
    });
  }, [data, isSortedDesc, sortKey]);

  useEffect(() => {
    (async () => {
      setIsLoadingContent(true);
      try {
        if (isAddContentModal || isEditContentModal) return;
        const res = await api.get(currentType);
        setData(res.data);
      } catch ({ response }) {
        catchHandler(response);
      } finally {
        setIsLoadingContent(false);
      }
    })();
  }, [isAddContentModal, isEditContentModal, currentType]);

  return (
    <div className={styles.root}>
      {isLoadingContent && <GlobalLoader />}
      <GoHome />
      <Typography.Title view="xlarge" tag="h1" className={styles.title}>
        {title}
      </Typography.Title>
      {isCorrectToken && (
        <Button className={styles.add} block view="link" onClick={handleAddContent}>
          Добавить
        </Button>
      )}
      <SearchForm setSearchValue={setSearchValue} />
      <Table>
        <Table.THead>
          <Table.THeadCell>Название</Table.THeadCell>
          <Table.TSortableHeadCell
            width={100}
            textAlign="center"
            isSortedDesc={sortKey === SortTableValue.type ? isSortedDesc : undefined}
            onSort={() => handleSort(SortTableValue.type)}>
            Статус
          </Table.TSortableHeadCell>
          <Table.TSortableHeadCell
            width={100}
            textAlign="center"
            isSortedDesc={sortKey === SortTableValue.rating ? isSortedDesc : undefined}
            onSort={() => handleSort(SortTableValue.rating)}>
            Оценка
          </Table.TSortableHeadCell>
          <Table.THeadCell width={100} textAlign="center">
            Ссылка
          </Table.THeadCell>
          <Table.THeadCell hidden={!isCorrectToken} width={150} textAlign="center">
            Управление
          </Table.THeadCell>
        </Table.THead>
        <Table.TBody>
          {sortedData?.map((row) => (
            <Table.TRow className={styles.tr} key={row._id}>
              <Table.TCell>{row.title}</Table.TCell>
              <Table.TCell>
                {row.statusText ? (
                  <Tooltip
                    content={row.statusText}
                    position="top"
                    view="hint"
                    targetClassName={styles.tooltip}>
                    {iconStatus[row.status]}
                  </Tooltip>
                ) : (
                  iconStatus[row.status]
                )}
              </Table.TCell>
              <Table.TCell>{row.status === 'complete' ? row.rating : `—`}</Table.TCell>
              <Table.TCell>
                {row.linkKinopoisk ? (
                  <a
                    className={styles.link}
                    href={row.linkKinopoisk}
                    target="_blank"
                    rel="noreferrer">
                    <img src={kinopoisk} width={20} height={20} alt="kinopoisk" />
                  </a>
                ) : null}
                {row.linkTikTok ? (
                  <a className={styles.link} href={row.linkTikTok} target="_blank" rel="noreferrer">
                    <img src={tiktok} width={20} height={20} alt="tiktok" />
                  </a>
                ) : null}
              </Table.TCell>
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
                  onClick={() => deleteCinematography(row._id, row.title)}
                />
              </Table.TCell>
            </Table.TRow>
          ))}
        </Table.TBody>
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
    </div>
  );
});
