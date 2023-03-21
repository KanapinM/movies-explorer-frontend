import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike }) {
    const currentUser = React.useContext(CurrentUserContext);

    function handleClickImage() {
        onCardClick(card);
    }
    function handleCardLike() {
        onCardLike(card);
    }

    const isLiked = card.likes.some(i => i._id === currentUser._id);

    const cardLikeButtonClassName = (
        `card__like-button ${isLiked ? 'card__like-button_active' : 'card__like-button'}`
    );

    return (
        <article id="template" className="card">
            <img
                onClick={handleClickImage}
                className="card__photo"
                src={card.link}
                alt={card.name}
            />
            <div className="card__place">
                <h2 className="card__tittle">{card.name}</h2>
                <div className="card__container">
                    <button
                        onClick={handleCardLike}
                        type="button" aria-label="like"
                        className={cardLikeButtonClassName}
                    />
                </div>
            </div>
            <p className='card__chrono'>1ч 42м</p>

        </article>
    )
}

export default Card;