import React from 'react';
import { Link } from "react-router-dom";
import profileLogo from '../../images/profile-logo.svg';

function Navigation() {

    const [isSideBarOpen, setIsSideBarOpen] = React.useState(false);
    function onCloseSidebar() {
        console.log('close');
        setIsSideBarOpen(false);
    }
    function openSideBar() {
        console.log('open');
        setIsSideBarOpen(true);
    }

    return (
        <>
            <nav className='navigation'>
                <div className='navigation__links'>
                    <Link
                        to="/movies"
                        className="navigation__link">
                        Фильм
                    </Link>
                    <Link
                        to="/saved-movies"
                        className="navigation__link">
                        Сохранённые фильмы
                    </Link>
                </div>
                <div className='navigation__profile'>
                    <Link
                        to="/profile"
                        className="header__href header__href_profile">
                        Аккаунт
                        <img
                            className="header__logo-profile"
                            src={profileLogo}
                            alt="логтип аккаунта"
                        />
                    </Link>

                </div>
            </nav>

            <nav className="navigation__hamburger">
                <button className="navigation__hamburger-button" onClick={openSideBar}></button>
            </nav>
            <div
                isSideBarOpen={isSideBarOpen}
                className={`navigation__sidebar ${isSideBarOpen ? 'navigation__sidebar_open' : ''}`} >
                <nav className='navigation__menu'>
                    <button
                        onClick={onCloseSidebar}
                        type="button"
                        className="navigation__close-button"
                    />
                    <div className='navigation__links'>
                        <Link
                            to="/"
                            className="navigation__link">
                            Главная
                        </Link>
                        <Link
                            to="/movies"
                            className="navigation__link">
                            Фильм
                        </Link>
                        <Link
                            to="/saved-movies"
                            className="navigation__link">
                            Сохранённые фильмы
                        </Link>
                    </div>
                    <div className='navigation__profile'>
                        <Link
                            to="/profile"
                            className="header__href header__href_profile">
                            Аккаунт
                            <img
                                className="header__logo-profile"
                                src={profileLogo}
                                alt="логтип аккаунта"
                            />
                        </Link>

                    </div>
                </nav>
            </div>
        </>
    );
}
export default Navigation;
