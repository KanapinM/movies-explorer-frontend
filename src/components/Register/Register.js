import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import { useFormWithValidation } from '../../validation/validation';


function Register({ onSubmit }) {
    const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

    function handleRegister(name, email, password) {
        onSubmit(name, email, password);
    };

    function handleSubmit(evt) {
        evt.preventDefault();
        handleRegister(values.name, values.email, values.password);
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
                        className={`user__input ${(errors.name === '') ? '' : 'user__input_error'}`}
                        name="name"
                        type="name"
                        pattern="[a-zа-яA-ZА-ЯёЁ\-\s]+"
                        minLength="2"
                        maxLength="30"
                        value={values.name || ''}
                        required
                    />
                    <span className='user__input-error'>{errors.name}</span>
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

                    <label className="user__input-label" >Пароль</label>
                    <input
                        onChange={handleChange}
                        className={`user__input ${(errors.password === '') ? '' : 'user__input_error'}`}
                        name="password"
                        type="password"
                        value={values.password || ''}
                        required
                    />
                    <span className='user__input-error'>{errors.password}</span>
                    <button type="submit" className={`user__submit-button  user__submit-button_register  ${isValid ? '' : 'user__submit-button_disabled'}`} disabled={!isValid}>
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
