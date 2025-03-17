import './App.css';
import AppRoutes from './routes/AppRoutes';
import { Toaster } from 'react-hot-toast';
import { useAppSelector } from './app/reduxHooks';
import Loader from './components/loader/Loader';

function App() {
  const loaderState = useAppSelector((state) => state.loaderState);
  const { isLoading } = loaderState;

  return (
    <div className="App">
          {isLoading && <Loader />}
          <AppRoutes />
          <Toaster />
    </div>
  );
}

export default App; //this export is req. in index.tsx file where it will be added in root element
