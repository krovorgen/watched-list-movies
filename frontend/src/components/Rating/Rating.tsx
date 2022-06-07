import React, { FC, memo, useMemo } from 'react';
import cn from 'classnames';

import styles from './Rating.module.scss';

export type RatingValueType = number;

type RatingProps = {
  value: RatingValueType;
  onClick: (value: RatingValueType) => void;
};

export const Rating: FC<RatingProps> = memo(({ value, onClick }) => {
  const memoStars = useMemo(
    () =>
      Array(10)
        .fill(0)
        .map((el, index) => (
          <Star key={index} selected={value >= index + 1} onClick={() => onClick(index + 1)} />
        )),
    [onClick, value],
  );
  return <div className={styles.root}>{memoStars}</div>;
});

type StarProps = {
  selected: boolean;
  onClick: () => void;
};

const Star: FC<StarProps> = memo(({ selected, onClick }) => (
  <span className={cn(styles.star, { [styles.active]: selected })} onClick={onClick} />
));
