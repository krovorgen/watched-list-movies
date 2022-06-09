import { Route, Routes } from 'react-router-dom';

import { AppRoutes } from './helpers/routes';
import { Root } from './pages/Root';
import { NotFound } from './pages/NotFound';
import { Cinematography } from './pages/Cinematography';
import { CinematographyType } from './types/global';

export const App = () => (
  <Routes>
    <Route path={AppRoutes.Root} element={<Root />} />
    <Route
      path={AppRoutes.Films}
      element={
        <Cinematography key={Math.random()} currentType={CinematographyType.films} title="Фильмы" />
      }
    />
    <Route
      path={AppRoutes.Serials}
      element={
        <Cinematography
          key={Math.random()}
          currentType={CinematographyType.serials}
          title="Сериалы"
        />
      }
    />
    <Route
      path={AppRoutes.Cartoons}
      element={
        <Cinematography
          key={Math.random()}
          currentType={CinematographyType.cartoons}
          title="Мультфильмы"
        />
      }
    />
    <Route path="*" element={<NotFound />} />
  </Routes>
);
