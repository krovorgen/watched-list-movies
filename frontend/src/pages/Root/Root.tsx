import React, { MouseEvent, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { AppRoutes } from 'helpers/routes';
import legend from 'assets/videos/legend.webm';
import misfits from 'assets/videos/misfits.webm';
import walle from 'assets/videos/walle.webm';

import styles from './Root.module.scss';

const linksData = [
  {
    videoPath: legend,
    linkPath: AppRoutes.Films,
    linkTitle: 'Films',
  },
  {
    videoPath: misfits,
    linkPath: AppRoutes.Serials,
    linkTitle: 'Serials',
  },
  {
    videoPath: walle,
    linkPath: AppRoutes.Cartoons,
    linkTitle: 'Cartoon',
  },
];

export const Root = () => {
  const mouseOverVideoHandler = useCallback(async (e: MouseEvent<HTMLLIElement>) => {
    await (e.currentTarget.children.item(0) as HTMLVideoElement).play();
  }, []);

  const mouseOutVideoHandler = useCallback((e: MouseEvent<HTMLLIElement>) => {
    (e.currentTarget.children.item(0) as HTMLVideoElement).pause();
  }, []);

  return (
    <ul className={styles.items}>
      {linksData.map((item) => (
        <li
          className={styles.item}
          onMouseOver={mouseOverVideoHandler}
          onMouseOut={mouseOutVideoHandler}>
          <video className={styles.video} src={item.videoPath} loop muted />
          <Link className={styles.link} to={item.linkPath}>
            {item.linkTitle}
          </Link>
        </li>
      ))}
    </ul>
  );
};
