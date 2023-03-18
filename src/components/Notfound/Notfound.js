import React from 'react';
import { useHistory } from 'react-router-dom';

function Notfound() {
    const history = useHistory();
    return (
        <div>
            <div className="notfound__container">

                <h2 className="notfound__title">
                    404
                </h2>
                <p className="notfound__text">
                    Страница не найдена
                </p>
                <button onClick={() => history.goBack()} className="notfound__link">Назад</button>
            </div>
        </div>)
}
export default Notfound;