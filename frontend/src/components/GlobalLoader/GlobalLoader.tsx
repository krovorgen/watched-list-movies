import React from 'react';

import { Spinner } from '@alfalab/core-components/spinner';

import styles from './GlobalLoader.module.scss';

export const GlobalLoader = () => {
  return (
    <div className={styles.root}>
      <Spinner visible size="m" />
      <p className={styles.text}>Загрузка ...</p>
    </div>
  );
};
