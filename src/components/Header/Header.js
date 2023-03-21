import React from 'react';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';
import { Switch, Route, Link } from "react-router-dom";


function Header() {

    return (
        <header className="header">

            <Switch>
                <Route path="/(movies|saved-movies|profile)">
                    <Link
                        to="/">
                        <img
                            className="header__logo"
                            src={logo}
                            alt="логтип"
                        />
                    </Link>

                    <Navigation />
                </Route>

                <Route path="(/)">
                    <Link
                        to="/movies">
                        <img
                            className="header__logo"
                            src={logo}
                            alt="логтип"
                        />
                    </Link>
                    <div className="header__container">
                        <Link
                            to="/signup"
                            className="header__href">
                            Регистрация
                        </Link>
                        <Link to="/signin" className="header__button">
                            Войти
                        </Link>
                    </div>
                </Route>

            </Switch>

        </header>
    );
}

export default Header;

