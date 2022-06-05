import { Route, Routes } from 'react-router-dom';
import { AppRoutes } from './helpers/routes';
import { Root } from './pages/Root';
import { NotFound } from './pages/NotFound';
import {Films} from "./pages/Films";

export const App = () => {
  return (
    <Routes>
      <Route path={AppRoutes.Root} element={<Root />} />
      <Route path={AppRoutes.Films} element={<Films />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
