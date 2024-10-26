import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import store ,{persistor} from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import MovieDetail from 'pages/MovieDetail/MovieDetail';
import Home from './pages/Home'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
      <Router>
      <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="movie/:imdbID" element={<MovieDetail />} /> 
          </Route>
        </Routes>
      </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
