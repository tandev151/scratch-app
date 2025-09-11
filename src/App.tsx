import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './App.css';
import { routesConfig } from '@/routes/config';

const router = createBrowserRouter(routesConfig);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
