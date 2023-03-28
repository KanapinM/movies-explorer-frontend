import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile({ ...props }) {
    const userData = React.useContext(CurrentUserContext);

    return (
        <section className='profile'>
            <div className="profile__container">
                <h2 className="profile__title">
                    Привет, {userData.name}!
                </h2>
                <form className="profile__form">
                    <div>
                        <div className='profile__data'>
                            <p className='profile__data-type'>Имя</p>
                            <p className='profile__data-person'>{userData.name}</p>
                        </div>
                        <div className='profile__data'>
                            <p className='profile__data-type'>E-mail</p>
                            <p className='profile__data-person'>{userData.email}</p>
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
        </section>
    );
}

export default Profile;
