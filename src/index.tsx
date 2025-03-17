import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(  
  // <React.StrictMode>
    <BrowserRouter> {/* commonly renamed as Router*/}
      <Provider store={store}>  {/* commonly renamed as ReduxProvider*/}
        <App />
      </Provider>
    </BrowserRouter>
  // </React.StrictMode>
);

