import React from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

import api from '../utils/Api';
import auth from '../utils/Auth';

import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import InfoTooltip from './InfoTooltip/InfoTooltip';

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
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [isSuccessTooltipStatus, setTooltipStatus] = React.useState(false);

  React.useEffect(() => {
    checkToken();
  }, []);
  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserData(), api.getInitialCards()])
        .then(([user, cards]) => {
          setCurrentUser(user);
          setCards(cards);
        })
        .catch((err) => console.log(err))
    }
  }, [loggedIn])

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }


  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => console.log(err))
  }

  function handleUpdateUser(dataUser) {
    api
      .editUserData(dataUser)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  function handleLogin(email, password) {
    auth
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

  function handleRegister(email, password) {
    auth
      .signup(email, password)
      .then((data) => {
        if (data) {
          setEmail(email);
          openTooltip(true);
          history.push('/signin');
        }
      })
      .catch((err) => {
        console.log(err);
        openTooltip(false);
      });
  }

  function onQuit() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
  }

  function checkToken() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      return auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.data.email);
            history.push('/');
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
    setSelectedCard(null);
    setInfoTooltipOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

        <Switch>
          <Route path="/signup">
            <Register auth={auth} onSubmit={handleRegister} />
          </Route>

          <Route path="/signin">
            <Login auth={auth} onSubmit={handleLogin} />
          </Route>
          <Route path="/notfound">
            <Notfound />
          </Route>

          <ProtectedRoute
            exact
            path="/movies"
            component={Movies}
            loggedIn={loggedIn}
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
          />
          <ProtectedRoute
            exact
            path="/saved-movies"
            component={SavedMovies}
            loggedIn={loggedIn}
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
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
            path="/"
            component={Main}
          />

        </Switch>

        <EditProfilePopup
          isEditProfilePopupOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          isSuccessTooltipStatus={isSuccessTooltipStatus}
          isInfoTooltipOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider >

  );
}

export default App;