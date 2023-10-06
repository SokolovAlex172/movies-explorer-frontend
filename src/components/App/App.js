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
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import MainApi from '../../utils/MainApi';
import { infoMessage } from '../../utils/constants';
import Popup from "../Popup/Popup";


function App() {
  const navigate = useNavigate();
  
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPopup, setIsPopup] = useState({
    isOpen: false,
    status: false,
    messageText: "",
  });
  const [currentUser, setCurrentUser] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      setIsLoading(true);
      MainApi
        .getUserInfo()
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setCurrentUser(res);
            // navigate("/movies");
          }
        })
        .catch((err) =>
        setIsPopup({
            isOpen: true,
            status: false,
            messageText: `Error: ${err}`,
          })
        )
        .finally(() => {
          setIsLoading(true);
        });
    } else {
      setIsLoading(true);
    }
  }, []);

  // useEffect(() => {
  //   if (loggedIn) {
  //     setIsLoading(true);
  //     MainApi
  //       .getUserInfo()
  //       .then((res) => setCurrentUser(res))
  //       .catch((err) =>
  //       setIsPopup({
  //           isOpen: true,
  //           status: false,
  //           messageText: `Error: ${err}`,
  //         })
  //       )
  //       .finally(() => setIsLoading(false));
  //   }
  // }, [loggedIn]);

  // useEffect(() => {
  //   if (loggedIn && currentUser) {
  //     MainApi
  //       .getSavedMovies()
  //       .then((res) => {
  //         const userMovies = res.filter(
  //           (movie) => movie.owner === currentUser._id
  //         );
  //         // setSavedMovies(userMovies);
  //       })
  //       .catch((err) =>
  //         setIsTooltip({
  //           isOpen: true,
  //           state: false,
  //           messageText: `Error: ${err}`,
  //         })
  //       );
  //   }
  // }, [currentUser, loggedIn]);

  const handleRegister = (user) => {
    setIsLoading(true);
    MainApi
      .register(user)
      .then(() => {
        handleLogin({email: user.email, password:user.password});
      })
      .catch(() => {
        setIsPopup({
          isOpen: true,
          status: false,
          messageText: infoMessage.NO_UNIQUE_EMAIL,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const handleLogin = (user) => {
    setIsLoading(true);
    MainApi
      .authorize(user)
      .then((jwt) => {
        if (jwt.token) {
          localStorage.setItem("jwt", jwt.token);
          setLoggedIn(true);
          navigate("/movies");
        }
      })
      .catch(() => {
        setIsPopup({
          isOpen: true,
          status: false,
          messageText: infoMessage.AUTH_ERROR,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const onClosePopup = () => {
    setIsPopup({ ...isPopup, isOpen: false });
  }

  const handleSignOut = () =>{
    localStorage.clear();
    setLoggedIn(false);
    setCurrentUser({});
    setIsLoading(false);
    navigate("/");
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="app">
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
              <Movies />
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
              <SavedMovies />
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
               handleSignOut={handleSignOut}/>
            </ProtectedRoute>
            
          }
        />
        <Route
          exact
          path='/signup'
          element={!loggedIn ? (
            <Register handleRegister={handleRegister} isLoading={isLoading}/>
          ) : (
            <Navigate to='/' />
          )}
          />
        <Route 
          exact
          path="/signin"
          element={!loggedIn ? (
            <Login handleLogin={handleLogin} isLoading={isLoading}/>
          ) : (
            <Navigate to='/' />
          )}
          />
        <Route
          path='*'
          element={<NotFound />}
        />
      </Routes>
      <Popup isPopup={isPopup} onClosePopup={onClosePopup} />
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
