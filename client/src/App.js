// import './App.css';
import { Routes, Route } from 'react-router'
import LandingPage from './components/LandingPage';


function App() {
  return (
    <div className='App'>
      <Routes>
        <Route exact path={'/nav'} element={<LandingPage />} />
      </Routes>
    </div>
  );
}

export default App;
