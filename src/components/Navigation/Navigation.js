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
                        Фильмы
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
                        className="navigation__href">
                        Аккаунт
                        <img
                            className="navigation__logo-profile"
                            src={profileLogo}
                            alt="логтип аккаунта"
                        />
                    </Link>

                </div>
            </nav>

            <nav className="navburger">
                <button className="navburger-button" onClick={openSideBar}></button>
            </nav>

            <div
                isSideBarOpen={isSideBarOpen}
                className={`navigation-sidebar ${isSideBarOpen ? 'navigation-sidebar_open' : ''}`} >
                <nav className='navigation-sidebar__menu'>
                    <button
                        onClick={onCloseSidebar}
                        type="button"
                        className="navigation-sidebar__close-button"
                    />
                    <div className='navigation-sidebar__links'>
                        <Link
                            to="/"
                            className="navigation-sidebar__link">
                            Главная
                        </Link>
                        <Link
                            to="/movies"
                            onClick={onCloseSidebar}
                            className="navigation-sidebar__link">
                            Фильмы
                        </Link>
                        <Link
                            to="/saved-movies"
                            onClick={onCloseSidebar}
                            className="navigation-sidebar__link">
                            Сохранённые фильмы
                        </Link>
                    </div>
                    <div className='navigation-sidebar__profile'>
                        <Link
                            to="/profile"
                            onClick={onCloseSidebar}
                            className="navigation-sidebar__href">
                            Аккаунт
                            <img
                                className="navigation-sidebar__logo-profile"
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
