import React, { ChangeEvent, FC, memo, useCallback } from 'react';

import { Input } from '@alfalab/core-components/input/modern';

import styles from './SearchForm.module.scss';

type Props = {
  setSearchValue: (value: string) => void;
};

export const SearchForm: FC<Props> = memo(({ setSearchValue }) => {
  const handleNewCardValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value),
    [setSearchValue],
  );

  return (
    <div className={styles.root}>
      <Input placeholder="Найти" size="s" block onChange={handleNewCardValue} required />
    </div>
  );
});
