// import './App.css';
import { Routes, Route } from 'react-router'
import Home from './components/Home';
import LandingPage from './components/LandingPage';
import DetailPokemon from './components/DetailPokemon';
import CreatePokemon from './components/CreatePokemon';
import PageNotFound from './components/PageNotFound';



function App() {
  return (
    <div className='App'>
      <Routes>
        <Route exact path={'/'} element={<LandingPage />} />
        <Route exact path={'/home'} element={<Home />} />
        <Route exact path={'/detail/:id'} element={<DetailPokemon />} />
        <Route exact path={'/create'} element={<CreatePokemon />} />
        <Route path={'*'} element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
