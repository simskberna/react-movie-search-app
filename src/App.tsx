import React from 'react';
import Header from './components/Header'; 
import { Outlet } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
