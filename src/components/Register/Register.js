import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

function Register({ onSubmit }) {

    const [userData, setUserData] = React.useState({
        email: "",
        password: "",
    });

    function handleRegister(email, password) {
        onSubmit(email, password);
    };

    function handleChange(e) {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    function handleSubmit(evt) {
        evt.preventDefault();

        if (!userData.password) {
            return;
        }
        const { email, password } = userData;
        handleRegister(email, password);

    }


    return (
        <section className="user">
            <div className="user__container">
                <Link to="/" className="user__logo">
                    <img
                        className="user__logo-image"
                        src={logo}
                        alt="логтип"
                    />
                </Link>
                <h2 className="user__title">
                    Добро пожаловать!
                </h2>

                <form onSubmit={handleSubmit} className="user__form">
                    <label className="user__input-label" >Имя</label>
                    <input
                        onChange={handleChange}
                        className="user__input"
                        name="name"
                        type="name"
                    />
                    <label className="user__input-label" >Email</label>
                    <input
                        onChange={handleChange}
                        className="user__input"
                        name="email"
                        type="email"
                        required
                    />
                    <label className="user__input-label" >Пароль</label>
                    <input
                        onChange={handleChange}
                        className="user__input"
                        name="password"
                        type="password"
                        required
                    />
                    <p className='user__input-error'>Что-то пошло не так...</p>
                    <button type="submit" className="user__submit-button user__submit-button_register">
                        Зарегистрироваться
                    </button>
                    <p className="user__registered">
                        Уже зарегистрированы? &nbsp;
                        <Link to="/signin" className="user__registered-link">
                            Войти
                        </Link>
                    </p>
                </form>
            </div>
        </section>
    )
}

export default Register;
