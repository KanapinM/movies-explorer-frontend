import React from 'react';
import mainApi from '../../utils/MainApi';
import { useLocation } from 'react-router-dom';

function Card({ card, handleCardLike, handleCardDelete, savedCards }) {

    const [duration, setDuratiion] = React.useState('');

    const isLiked = React.useMemo(() => {
        timeDuration();
        return !!savedCards?.some((i) => i.movieId === card.id);
    }, [savedCards, card])

    const location = useLocation();
    const locationMovies = ['/movies'].includes(location.pathname);
    function timeDuration() {
        let h = Math.floor(card.duration / 60) + 'ч';
        if (Math.floor(card.duration / 60) === 0) {
            h = '';
        }
        let m = (card.duration % 60) + 'мин';
        setDuratiion(`${h} ${m}`);
    }

    const cardLikeButtonClassName = (
        `card__like-button ${isLiked ? 'card__like-button_active' : 'card__like-button'}`
    );

    function handleLike() {
        handleCardLike(card, !isLiked);
    }

    function handleDelete() {
        handleCardDelete(card);
    }

    return (
        <article id="template" className="card" card={card}>
            {locationMovies ? <a href={card.trailerLink} target="_blank" rel="noreferrer">
                <img
                    className="card__photo"
                    src={'https://api.nomoreparties.co' + card.image.url}
                    alt={card.nameRU}
                />
            </a> : <a href={card.trailer} target="_blank" rel="noreferrer">
                <img
                    className="card__photo"
                    src={card.image}
                    alt={card.nameRU}
                /></a>}
            <div className="card__place">
                <h2 className="card__tittle">{card.nameRU}</h2>
                <div className="card__container">
                    {locationMovies ? <button
                        onClick={handleLike}
                        type="button" aria-label="like"
                        className={cardLikeButtonClassName}
                    /> : <button
                        onClick={handleDelete}
                        type="button" aria-label="like"
                        className="card__delete-movie"
                    />}
                </div>
            </div>
            <p className='card__chrono'>{duration}</p>

        </article>
    )
}

export default Card;