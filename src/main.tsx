import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import './index.css';

import App from './App.tsx';

import { QueryProvider } from '@/lib/queryClient';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <App />
    </QueryProvider>
  </StrictMode>,
);
