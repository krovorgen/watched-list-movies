import { Route, Routes } from 'react-router-dom';

import { AppRoutes } from './helpers/routes';
import { Root } from './pages/Root';
import { NotFound } from './pages/NotFound';
import { Cinematography } from './pages/Cinematography';
import { CinematographyType } from './types/global';

export const App = () => {
  return (
    <Routes>
      <Route path={AppRoutes.Root} element={<Root />} />
      <Route
        path={AppRoutes.Films}
        element={<Cinematography currentType={CinematographyType.films} />}
      />
      <Route
        path={AppRoutes.Serials}
        element={<Cinematography currentType={CinematographyType.serials} />}
      />
      <Route
        path={AppRoutes.Cartoons}
        element={<Cinematography currentType={CinematographyType.cartoons} />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
