import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import router from './router';
import AppContextProvider from './context';

function App() {
  return (
    <AppContextProvider>
      <Toaster />
      <RouterProvider router={router} />
    </AppContextProvider>
  );
}

export default App;
