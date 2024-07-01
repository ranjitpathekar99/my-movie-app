import React from 'react';
import './App.css';
import { AppBar } from './components/Appbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MovieDashboard } from './components/MovieDashboard';
import { MovieDetailsPage } from './components/MovieDetailsPage';

const App: React.FC = () =>{
  return (
    <div className='App-header'>
      <AppBar/>
      <Router>
        <Routes>
          <Route path="/" Component={MovieDashboard} />
          <Route path="/:movieId" Component={MovieDetailsPage} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
