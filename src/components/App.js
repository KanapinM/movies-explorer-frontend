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
  const [loggedIn, setLoggedIn] = React.useState((document.cookie !== 'undefind' || '') ? true : false);

  const [cards, setCards] = React.useState([]);
  const [card, setCard] = React.useState({});
  const [savedCards, setSavedCards] = React.useState([]);

  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [isSuccessTooltipStatus, setTooltipStatus] = React.useState(false);
  // const [isLiked, setIsLiked] = React.useState();


  React.useEffect(() => {
    checkToken();
  }, []);

  React.useEffect(() => {
    if (loggedIn && (location.pathname === '/signup' || location.pathname === '/signin')) {
      history.push('/');
    }
  }, [])

  const [searchedSavedMovies, setSearchedSavedMovies] = React.useState(false);




  React.useEffect(() => {
    if (loggedIn) {
      moviesApi.getInitialMovies()
        .then((cards) => {
          setCards(cards);

        })
        .catch((err) => {
          console.log(err);
          openTooltip(false);
        });
    }
  }, [loggedIn])

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([mainApi.getUserData(), mainApi.getSavedMovies()])
        .then(([user, userCards]) => {
          setLoggedIn(true);
          setCurrentUser(user);

          setSavedCards(userCards);
        })
        .catch((err) => {
          console.log(err);
          openTooltip(false);
        });
    }
  }, [loggedIn])


  // React.useEffect(() => {
  //   mainApi.getSavedMovies()
  //     .then((res) => {

  //       setSavedCards(res);
  //       console.log(res);
  //       console.log(savedCards);

  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       openTooltip(false);
  //     });
  // }, [])



  const location = useLocation();
  const showHeader = ['/movies', '/saved-movies', '/', '/profile'].includes(location.pathname);
  const showFooter = ['/movies', '/saved-movies', '/'].includes(location.pathname);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleCardLike(card) {
    console.log(card);

    // setSavedCards(savedCards.filter((cards) => cards.movieId === card.movieId));

    mainApi.getSavedMovies()
      .then((res) => {
        console.log(res);

        // if (savedCards.filter((cards) => cards.movieId !== card.movieId)) {
        // console.log(123);
        setSavedCards(res);
        setCard(card);
        // }

        // setSavedCards(res.filter((cards) => cards.id === card.movieId));
        console.log(savedCards);
      })
      .catch((err) => {
        console.log(err);
        openTooltip(false);
      });

  }

  function handleUpdateUser(dataUser) {
    mainApi
      .editUserData(dataUser)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
        openTooltip(false);
      });
  }

  function handleLogin(email, password) {
    mainApi
      .signin(email, password)
      .then((data) => {
        if (data.token) {
          setEmail(email);

          setLoggedIn(true);
          history.push('/movies');
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
    localStorage.clear();
    console.log('вы вышли');
    document.cookie = 'undefind';
    setLoggedIn(false);

    mainApi
      .logout()
      .catch((err) => {
        console.log(err);
        openTooltip(false);
      });
  }

  function checkToken() {
    if (document.cookie !== 'undefind' || '') {
      return mainApi
        .checkToken()
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.email);
          }
        })
        .catch((err) => {
          console.log(err);
          openTooltip(false);
        });
    }
  }

  function handleCardDelete(card) {
    console.log(card);
    console.log('карточка удалена');
    mainApi
      .remove(card._id)
      .then(() => {
        console.log('тут');

        console.log(searchedSavedMovies);
        setSavedCards(savedCards.filter((cards) => cards.movieId !== card.movieId));

        if (searchedSavedMovies !== false) {
          setSearchedSavedMovies(searchedSavedMovies.filter((cards) => cards.movieId !== card.movieId));
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
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
            card={card}
            savedCards={savedCards}

            handleCardLike={handleCardLike}
          // isLiked={isLiked}
          // setIsLiked={setIsLiked}
          />
          <ProtectedRoute
            exact
            path="/saved-movies"
            component={SavedMovies}
            loggedIn={loggedIn}
            cards={savedCards}

            handleCardDelete={handleCardDelete}

            searchedSavedMovies={searchedSavedMovies}
            setSearchedSavedMovies={setSearchedSavedMovies}
            card={card}
          // isLiked={isLiked}
          // setIsLiked={setIsLiked}
          />
          <ProtectedRoute
            path="/profile"
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