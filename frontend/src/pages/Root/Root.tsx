import React, { MouseEvent, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { AppRoutes } from '../../helpers/routes';
import misfits from '../../assets/videos/misfits.webm';
import legend from '../../assets/videos/legend.webm';
import walle from '../../assets/videos/walle.webm';

import styles from './Root.module.scss';

export const Root = () => {
  const mouseOverVideoHandler = useCallback(async (e: MouseEvent<HTMLLIElement>) => {
    await (e.currentTarget.children.item(0) as HTMLVideoElement).play();
  }, []);

  const mouseOutVideoHandler = useCallback((e: MouseEvent<HTMLLIElement>) => {
    (e.currentTarget.children.item(0) as HTMLVideoElement).pause();
  }, []);

  return (
    <ul className={styles.items}>
      <li
        className={styles.item}
        onMouseOver={mouseOverVideoHandler}
        onMouseOut={mouseOutVideoHandler}>
        <video className={styles.video} src={legend} loop muted />
        <Link className={styles.link} to={AppRoutes.Films}>
          Films
        </Link>
      </li>
      <li
        className={styles.item}
        onMouseOver={mouseOverVideoHandler}
        onMouseOut={mouseOutVideoHandler}>
        <video className={styles.video} src={misfits} loop muted />
        <Link className={styles.link} to={AppRoutes.Serials}>
          Serials
        </Link>
      </li>
      <li
        className={styles.item}
        onMouseOver={mouseOverVideoHandler}
        onMouseOut={mouseOutVideoHandler}>
        <video className={styles.video} src={walle} loop muted />
        <Link className={styles.link} to={AppRoutes.Cartoons}>
          Cartoon
        </Link>
      </li>
    </ul>
  );
};
