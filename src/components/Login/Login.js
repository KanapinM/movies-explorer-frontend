import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import { useFormWithValidation } from '../../validation/validation';


function Login({ onSubmit, ...props }) {
    const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

    function handleLogin(email, password) {
        onSubmit(email, password);
    };
    function handleSubmit(evt) {
        evt.preventDefault();
        handleLogin(values.email, values.password);
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
                    Рады видеть!
                </h2>
                <form
                    onSubmit={handleSubmit}
                    className="user__form">
                    <label className="user__input-label" >Email</label>
                    <input
                        onChange={handleChange}
                        className={`user__input ${(errors.email === '') ? '' : 'user__input_error'}`}
                        name="email"
                        type="email"
                        value={values.email || ''}
                        required
                    />
                    <span className='user__input-error'>{errors.email}</span>
                    <label className="user__input-label">Пароль</label>
                    <input
                        onChange={handleChange}
                        className={`user__input ${(errors.password === '') ? '' : 'user__input_error'}`}
                        name="password"
                        type="password"
                        value={values.password || ''}
                        required
                    />
                    <span className='user__input-error'>{errors.password}</span>
                    <button
                        type="submit"
                        className={`user__submit-button user__submit-button_login ${isValid ? '' : 'user__submit-button_disabled'}`} disabled={!isValid}>
                        Войти
                    </button>
                    <p className="user__registered">
                        Ещё не зарегистрированы? &nbsp;
                        <Link to="/signup" className="user__registered-link">
                            Регистрация
                        </Link>
                    </p>
                </form>
            </div>
        </section>
    );
}

export default Login;
