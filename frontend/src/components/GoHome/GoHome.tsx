import React from 'react';
import { Link } from 'react-router-dom';
import { NavigationHomeMIcon } from '@alfalab/icons-glyph/NavigationHomeMIcon';
import { AppRoutes } from '../../helpers/routes';

import styles from './GoHome.module.scss';

export const GoHome = () => {
  return (
    <Link className={styles.root} to={AppRoutes.Root}>
      <NavigationHomeMIcon />
    </Link>
  );
};
