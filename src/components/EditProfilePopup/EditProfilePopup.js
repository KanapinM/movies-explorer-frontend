import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import PopupWithForm from '../Popup/PopupWithForm/PopupWithForm';
import { useFormWithValidation } from '../../validation/validation';


function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const { values, handleChange, errors, isValid, setValues, setIsValid, resetForm } = useFormWithValidation();
    React.useEffect(() => {
        setValues({ name: currentUser.name, email: currentUser.email });
        setIsValid(false);
    }, [currentUser, props.isEditProfilePopupOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser(values);
    }

    return (
        <PopupWithForm
            isValid={isValid}
            isOpen={props.isEditProfilePopupOpen}
            onClose={props.onClose}
            name="edit-profile"
            title="Редактировать профиль"
            buttonText="Сохранить"
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                onChange={handleChange}
                value={values.name || ''}
                className="popup__input popup__input_type_name"
                id="name-input"
                placeholder="Ваше Имя"
                required
                pattern="[a-zа-яA-ZА-ЯёЁ\-\s]+"
                minLength="2"
                maxLength="30"
                name="name"
            />
            <span className="popup__input-error name-input-error" >
                {errors.name}
            </span>

            <input
                type="email"
                onChange={handleChange}
                value={values.email || ''}
                className="popup__input popup__input_type_email"
                id="email-input"
                placeholder="Email"
                required
                name="email"
            />
            <span className="popup__input-error email-input-error" >{errors.email}</span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;