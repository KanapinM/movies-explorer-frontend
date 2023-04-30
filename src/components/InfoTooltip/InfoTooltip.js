import React from 'react';
import { useLocation } from 'react-router-dom';

function InfoTooltip(props) {
    const location = useLocation();
    const locationProfile = ['/profile'].includes(location.pathname);
    function succesInfo() {
        return locationProfile ? 'Вы успешно внесли изменения!' : 'Вы успешно зарегистрировались!'
    };

    return (
        <div className={`popup popup_type_info-tooltip ${props.isInfoTooltipOpen ? 'popup_open' : ''
            }`} >
            <button
                onClick={props.onClose}
                type="reset"
                className="popup__close-button"
            />
            <div className="popup__container">
                <div className={`popup__info-tooltip-image ${props.isSuccessTooltipStatus ? 'popup__info-tooltip-image_type_success' : 'popup__info-tooltip-image_type_fail'} `} />
                < h2 className="popup__title popup__title_status">
                    {props.isSuccessTooltipStatus ? succesInfo() : 'Что-то пошло не так! Попробуйте ещё раз.'}
                </h2>
            </div>
        </div>
    );
}

export default InfoTooltip;