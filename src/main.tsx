import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';

import App from './App.tsx';

import i18n from '@/lib/i18n/config';
import './index.css';
import { QueryProvider } from '@/lib/queryClient';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </QueryProvider>
  </StrictMode>,
);
