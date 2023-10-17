import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import MainApi from '../../utils/MainApi';
import Popup from '../Popup/Popup';
import { getTokenHeader } from '../../utils/MainApi';


function App() {
  const navigate = useNavigate();
  
  const [loggedIn, setLoggedIn] = useState(false);
  const [isPreloader, setIsPreloader] = useState(false);
  const [isPopup, setIsPopup] = useState({
    popupIsOpen: false,
    infoStatus: false,
    messageText: "",
  });
  const [currentUser, setCurrentUser] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);

  const handleRegister = (user) => {
    setIsPreloader(true);
    MainApi.register(user)
      .then(() => {
        setIsPopup({
          popupIsOpen: true,
          infoStatus: true,
          messageText: 'Вы успешно зарегистрированны!',
        });
        handleLogin(user);
      })
      .catch(() => {
        setIsPopup({
          popupIsOpen: true,
          infoStatus: false,
          messageText: 'При регистрации пользователя произошла ошибка',
        });
      })
      .finally(() => {
        setIsPreloader(false);
      });
  }

  const handleLogin = (user) => {
    setIsPreloader(true);
    MainApi.authorize(user)
      .then((jwt) => {
          if(jwt) {
            localStorage.setItem('jwt', jwt.token);
            setIsPopup({
              popupIsOpen: true,
              infoStatus: true,
              messageText: 'Вход выполнен успешно',
            });
            setLoggedIn(true);
            navigate('/movies');
          }

      })
      .catch(() => {
        setIsPopup({
          popupIsOpen: true,
          infoStatus: false,
          messageText: 'Неверный пароль или e-mail'
        });
      })
      .finally(() => {
        setIsPreloader(false);
      });
  }

  const handleSignOut = () =>{
    localStorage.clear();
    setLoggedIn(false);
    setCurrentUser({});
    setIsPreloader(false);
    onClosePopup();
    navigate('/');
  }


  const handleProfile = (user) =>{
    const jwt = localStorage.getItem('jwt');
    setIsPreloader(true);
    MainApi.setUserInfo(user, jwt)
      .then((res) => {
        setCurrentUser(res);
        setIsPopup({
          popupIsOpen: true,
          infoStatus: true,
          messageText: 'Ваши данные успешно обновлены!',
        });
      })
      .catch((err) => {
        setIsPopup({
          popupIsOpen: true,
          infoStatus: false,
          messageText: (err = '409' ? 'Пользователь с таким email уже существует'
          : 'Произошла ошибка'),
        });
      })
      .finally(() => {
        setIsPreloader(false);
      });
  }
  const handleSaveMovie = (movie) => {
    MainApi.saveMovie(movie)
      .then((newMovie) => setSavedMovies([newMovie, ...savedMovies]))
      .catch((err) =>
      setIsPopup({
        popupIsOpen: true,
        infoStatus: false,
        messageText: err,
        })
      );
  }
  const handleDeleteMovie = (movie) => {
    const savedMovie = savedMovies.find(
      (item) => item.movieId === movie.id || item.movieId === movie.movieId
    );
    MainApi.deleteMovie(savedMovie._id)
      .then(() => {
        if (window.location.pathname === '/movies') {
          const newMoviesList = savedMovies.filter((item) => item._id !== savedMovie._id);
          setSavedMovies(newMoviesList);
          }
          // if (window.location.pathname === '/seved-movies') {
          // const updatedSavedMovies = savedMovies.filter((savedMovie) => savedMovie._id !== movie._id);
          // setSavedMovies(updatedSavedMovies);
          // }
      })
      .catch((err) =>
      setIsPopup({
        popupIsOpen: true,
        infoStatus: false,
        messageText: `Error: ${err}`,
        })
      );
  }

  const onClosePopup = () => {
    setIsPopup(prevState => ({
      ...prevState,
      popupIsOpen: false
    }));
  }


  useEffect(() => {
    if (loggedIn) {
      const authHeader = getTokenHeader(); // Получение заголовка авторизации
      MainApi.getUserInfo(authHeader)
        .then((res) => {
          setCurrentUser(res);
          setLoggedIn(true);
        })
        .catch((err) => 
         console.log(err)
        )
    }
  }, [loggedIn]);
  
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      MainApi.checkToken(jwt)
        .then((res) => {
          setLoggedIn(true);
          setCurrentUser(res);
        })
        .catch((err) => 
          console.log(err)
        )
    }
  }, [navigate]);
  
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      const authHeader = getTokenHeader(); // Получение заголовка авторизации
      MainApi.getUserInfo(authHeader)
        .then((res) => {
          setCurrentUser(res);
          setLoggedIn(true);
        })
        .catch((err) => 
          console.log(err)
        )
    }
  }, []);

  useEffect(() => {
    if (loggedIn && currentUser) {
      MainApi.getInitialMovies()
        .then((res) => {
          const currentMovies = res.filter((movie) => movie.owner === currentUser._id);
          setSavedMovies(currentMovies);
        })
        .catch((err) =>
          setIsPopup({
            popupIsOpen: true,
            infoStatus: false,
            messageText: `Error: ${err}`,
            })
          );
    }
  }, [currentUser, loggedIn]);
  
  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className='app'>
      <Routes>
        <Route 
            exact path='/'
            element={
              <>
                <Header 
                  loggedIn={loggedIn}
                  isMenuOpen={isMenuOpen}
                  setIsMenuOpen={setIsMenuOpen}/>
                <Main />
                <Footer />
              </>
            }
          />
        <Route
          exact path='/movies'
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Header 
                loggedIn={loggedIn}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}/>
              <Movies 
                savedMovies={savedMovies}
                setIsPopup={setIsPopup}
                saveClick={handleSaveMovie}
                deleteClick={handleDeleteMovie}/>
              <Footer />
            </ProtectedRoute>
          }
        />
        <Route
          exact path='/saved-movies'
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Header 
                loggedIn={loggedIn}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}/>
              <SavedMovies 
                savedMovies={savedMovies}
                setIsPopup={setIsPopup}
                setSavedMovies={setSavedMovies }
                deleteClick={handleDeleteMovie}/>
              <Footer />
            </ProtectedRoute>
          }
        />
        <Route
          exact path='/profile'
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Header 
                loggedIn={loggedIn}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
               />
              <Profile 
               handleSignOut={handleSignOut}
               handleProfile={handleProfile}/>
               
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path='/signup'
          element={!loggedIn ? (
            <Register 
            handleRegister={handleRegister}  isPreloader={isPreloader}/>
          ) : (
            <Navigate to='/' />
          )}
          />
        <Route 
          exact
          path='/signin'
          element={!loggedIn ? (
            <Login 
            handleLogin={handleLogin} isPreloader = {isPreloader}/>
          ) : (
            <Navigate to='/' />
          )}
          />
        <Route
          path='*'
          element={<NotFound />}
        />
      </Routes>
      <Popup 
        isPopup={isPopup} 
        onClosePopup={onClosePopup} />
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
