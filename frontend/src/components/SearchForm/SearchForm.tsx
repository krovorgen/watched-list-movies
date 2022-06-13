import React, { ChangeEvent, FC, memo, useCallback, useMemo } from 'react';
import debounce from 'lodash/debounce';

import { Input } from '@alfalab/core-components/input';

import styles from './SearchForm.module.scss';

type Props = {
  setSearchValue: (value: string) => void;
};

export const SearchForm: FC<Props> = memo(({ setSearchValue }) => {
  const handleNewCardValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value),
    [setSearchValue],
  );

  const debouncedResults = useMemo(() => {
    return debounce(handleNewCardValue, 500);
  }, [handleNewCardValue]);

  return (
    <div className={styles.root}>
      <Input
        className={styles.input}
        placeholder="Найти"
        size="s"
        onChange={debouncedResults}
        required
      />
    </div>
  );
});
