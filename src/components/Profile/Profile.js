import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Header from '../Header/Header';

function Profile({ ...props }) {
    const userData = React.useContext(CurrentUserContext);

    return (
        <>
            <Header />
            <div className="profile__container">
                <h2 className="profile__title">
                    Привет, {userData.name}!
                </h2>
                <form
                    className="user__form">
                    <div>
                        <div className='profile__data'>
                            <p className='profile__data_type'>Имя</p>
                            <p className='profile__data_person'>{userData.name}</p>
                        </div>
                        <div className='profile__data'>
                            <p className='profile__data_type'>E-mail</p>
                            <p className='profile__data_person'>{props.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={props.onEditProfile}
                        type="button" aria-label="edit"
                        className="profile__edit-button"
                    >
                        Редактировать
                    </button>
                    <button
                        onClick={props.onQuit}
                        className="profile__quit-button">
                        Выйти из аккаунта
                    </button>
                </form>
            </div>
        </>
    );
}

export default Profile;
