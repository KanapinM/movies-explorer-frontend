import React from 'react';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

import moviesApi from '../utils/MoviesApi';
import mainApi from '../utils/MainApi';

import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import InfoTooltip from './InfoTooltip/InfoTooltip';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Main from '../components/Main/Main';
import Movies from '../components/Movies/Movies';
import SavedMovies from '../components/SavedMovies/SavedMovies';
import Profile from '../components/Profile/Profile';
import ImagePopup from '../components/Popup/ImagePopup/ImagePopup';
import EditProfilePopup from '../components/EditProfilePopup/EditProfilePopup'
import Notfound from '../components/Notfound/Notfound';


function App() {
  const history = useHistory();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({ email: '', name: '' });
  // const [loggedIn, setLoggedIn] = React.useState(token ? true : false);
  const [loggedIn, setLoggedIn] = React.useState((document.cookie !== '') ? true : false);

  const [cards, setCards] = React.useState([]);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [isSuccessTooltipStatus, setTooltipStatus] = React.useState(false);
  // const [moviesLastSearch, setMoviesLastSearch] = React.useState('');

  React.useEffect(() => {
    checkToken();
  }, []);

  React.useEffect(() => {
    if (loggedIn && (location.pathname === '/signup' || location.pathname === '/signin')) {
      history.push('/');
    }
  }, [])

  // React.useEffect(() => {
  //   if (loggedIn) {
  //     mainApi.getUserData()
  //       .then((user) => {
  //         setLoggedIn(true);
  //         setCurrentUser(user);
  //       })
  //       .catch((err) => console.log(err))
  //   }
  // }, [loggedIn])

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([mainApi.getUserData(), moviesApi.getInitialMovies()])
        .then(([user, cards]) => {
          setLoggedIn(true);
          setCurrentUser(user);
          setCards(cards);
        })
        .catch((err) => console.log(err))
    }
  }, [loggedIn])

  React.useEffect(() => { }, [cards]);

  const location = useLocation();
  const showHeader = ['/movies', '/saved-movies', '/', '/profile'].includes(location.pathname);
  const showFooter = ['/movies', '/saved-movies', '/'].includes(location.pathname);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleCardLike(card) {
    // const isLiked = card.likes.some(i => i._id === currentUser._id);
    // mainApi
    //   .changeLikeCardStatus(card._id, !isLiked)
    //   .then((newCard) => {
    //     setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    //   })
    //   .catch((err) => console.log(err))
    setCards(card);
    console.log(card);
  }

  function handleUpdateUser(dataUser) {
    mainApi
      .editUserData(dataUser)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  function handleLogin(email, password) {
    mainApi
      .signin(email, password)
      .then((data) => {
        if (data.token) {
          setEmail(email);

          setLoggedIn(true);
          history.push('/movies');
          console.log(data);
          return data;
        }
      })
      .catch((err) => {
        console.log(err);
        openTooltip(false);
      });
  }

  function handleRegister(email, password, name) {
    mainApi
      .signup(email, password, name)
      .then((data) => {
        if (data) {
          setEmail(email);
          setLoggedIn(true);
          openTooltip(true);
          history.push('/movies');
        }
      })
      .catch((err) => {
        console.log(err);
        openTooltip(false);
      });
  }

  function onQuit() {
    console.log('вы вышли');
    document.cookie = '';
    localStorage.clear();
    setLoggedIn(false);
  }

  function checkToken() {
    if (document.cookie !== '') {
      return mainApi
        .checkToken()
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.email);
          }
        })
        .catch((err) => console.log(err));
    }
  }

  function openTooltip(boolean) {
    setInfoTooltipOpen(true);
    setTooltipStatus(boolean);
  };


  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setInfoTooltipOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {showHeader ? <Header loggedIn={loggedIn} /> : <></>}
      <main>
        <Switch>
          <Route loggedIn={loggedIn} path="/signup">
            <Register onSubmit={handleRegister} />
          </Route>

          <Route loggedIn={loggedIn} path="/signin">
            <Login onSubmit={handleLogin} />
          </Route>

          <ProtectedRoute
            exact
            path="/movies"
            component={Movies}
            loggedIn={loggedIn}
            cards={cards}

            // lastSearchInput={moviesLastSearch}
            // setLastSearchInput={setMoviesLastSearch}

            // onCardClick={handleCardClick}
            onCardLike={handleCardLike}
          />
          <ProtectedRoute
            exact
            path="/saved-movies"
            component={SavedMovies}
            loggedIn={loggedIn}
            cards={cards}
          // onCardClick={handleCardClick}
          // onCardLike={handleCardLike}
          />
          <ProtectedRoute
            path="/profile"
            cards={cards}
            component={Profile}
            loggedIn={loggedIn}
            email={email}
            onEditProfile={handleEditProfileClick}
            onQuit={onQuit}
          />


          <Route
            exact path="/"
            component={Main}
          />

          <Route exact path="*">
            <Notfound />
          </Route>

        </Switch>
      </main>

      {showFooter ? <Footer /> : <></>}

      <EditProfilePopup
        isEditProfilePopupOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <ImagePopup
        // card={selectedCard}
        onClose={closeAllPopups}
      />
      <InfoTooltip
        isSuccessTooltipStatus={isSuccessTooltipStatus}
        isInfoTooltipOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
      />
    </CurrentUserContext.Provider >

  );
}

export default App;