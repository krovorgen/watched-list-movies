import React from 'react';
import {Link} from "react-router-dom";
import {AppRoutes} from "../../helpers/routes";

export const Root = () => {

  return (
    <>
      <Link to={AppRoutes.Films}>Films</Link>
      <Link to={AppRoutes.Serials}>Serials</Link>
      <Link to={AppRoutes.Cartoons}>Cartoon</Link>
    </>
  );
};
