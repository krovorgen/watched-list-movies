import React, { FC } from 'react';

import styles from './Rating.module.scss';

export type RatingValueType = 0 | 1 | 2 | 3 | 4 | 5;

export type RatingProps = {
  value: RatingValueType;
  onClick: (value: RatingValueType) => void;
};

export const Rating: FC<RatingProps> = ({ value, onClick }) => {
  return (
    <>
      <Star selected={value > 0} onClick={() => onClick(1)} />
      <Star selected={value > 1} onClick={() => onClick(2)} />
      <Star selected={value > 2} onClick={() => onClick(3)} />
      <Star selected={value > 3} onClick={() => onClick(4)} />
      <Star selected={value > 4} onClick={() => onClick(5)} />
    </>
  );
};

type StarProps = {
  selected: boolean;
  onClick: () => void;
};

const Star: FC<StarProps> = ({ selected, onClick }) => {
  return (
    <span className={`${styles['star']} ${selected && styles['star--active']}`} onClick={onClick} />
  );
};
