import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../helpers/routes';

import styles from './Root.module.scss';

export const Root = () => {
  return (
    <ul className={styles.items}>
      <li className={styles.item}>
        <Link className={styles.link} to={AppRoutes.Films}>
          Films
        </Link>
      </li>
      <li className={styles.item}>
        <Link className={styles.link} to={AppRoutes.Serials}>
          Serials
        </Link>
      </li>
      <li className={styles.item}>
        <Link className={styles.link} to={AppRoutes.Cartoons}>
          Cartoon
        </Link>
      </li>
    </ul>
  );
};
