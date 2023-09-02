import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';


function App() {
  return (
    <div className="app">
      <Routes>
        <Route 
            exact path='/'
            element={
              <>
                <Header />
                <Main />
                <Footer />
              </>
            }
          />
        <Route
          exact path='/movies'
          element={
            <>
              <Header />
              <Movies />
              <Footer />
            </>
          }
        />
        <Route
          exact path='/saved-movies'
          element={
            <>
              <Header />
              <SavedMovies />
              <Footer />
            </>
          }
        />
        <Route
          exact path='/profile'
          element={
            <>
                <Header />
                <Profile />
            </>
          }
        />
        <Route
          path='/signup'
          element={<Register />}
        />
        <Route
          path='/signin'
          element={<Login />}
        />
        <Route
          path='*'
          element={<NotFound />}
        />
      </Routes>
      
    </div>
  );
}

export default App;
