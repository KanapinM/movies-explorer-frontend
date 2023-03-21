import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
// import Card from '../Card/Card';


function SavedMovies(props) {
    function handleCardDelete() {
        console.log('Обработка удаления фильма');
    }
    return (
        <>
            <SearchForm />
            <div className="cards-container">
                <div className="card">
                    <img
                        className="card__photo"
                        src="https://cdn.ananasposter.ru/image/cache/catalog/poster/games/985-1000x830.jpg"
                        alt="mortal cobat"
                    />
                    <div className="card__place">
                        <h2 className="card__tittle">mortal cobat</h2>
                        <div className="card__container">
                            <button
                                onClick={handleCardDelete}
                                type="button"
                                className="card__delete-movie"
                            />
                        </div>
                    </div>
                    <p className='card__chrono'>1ч 42м</p>
                </div>

                <div className="card">
                    <img
                        className="card__photo"
                        src="https://proprikol.ru/wp-content/uploads/2021/05/kartinki-titanik-6.jpg"
                        alt="титаник"
                    />
                    <div className="card__place">
                        <h2 className="card__tittle">Титаник</h2>
                        <div className="card__container">
                            <button
                                onClick={handleCardDelete}
                                type="button"
                                className="card__delete-movie"
                            />
                        </div>
                    </div>
                    <p className='card__chrono'>1ч 42м</p>
                </div>
                <div className="card">
                    <img
                        className="card__photo"
                        src="https://www.film.ru/sites/default/files/filefield_paths/watchmen.jpg"
                        alt="хранители"
                    />
                    <div className="card__place">
                        <h2 className="card__tittle">Хранители</h2>
                        <div className="card__container">
                            <button
                                onClick={handleCardDelete}
                                type="button"
                                className="card__delete-movie"
                            />
                        </div>
                    </div>
                    <p className='card__chrono'>2ч 42м</p>
                </div>


            </div>
        </>
    );
}

export default SavedMovies;