import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import reportWebVitals from './reportWebVitals';

import './scss/index.scss';

import { App } from './App';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
    <ToastContainer
      position="bottom-left"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  </BrowserRouter>,
);

reportWebVitals();
