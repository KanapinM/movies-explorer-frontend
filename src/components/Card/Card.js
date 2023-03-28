import React from 'react';
import mainApi from '../../utils/MainApi';
import { useLocation } from 'react-router-dom';



function Card({ card, onCardClick, onCardLike }) {
    // const [card, setCard] = React.useState([]);
    let savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    const [isLiked, setIsLiked] = React.useState();


    React.useEffect(() => {
        timeDuration();
        // console.log(savedMovies.length);
        if (savedMovies) {
            // if (savedMovies.length !== 0) {
            if (savedMovies.find(i => i.movieId === card.id)) {
                setIsLiked(true);
            };
            return
        } else
            console.log('no saved');
    }, [isLiked, savedMovies, handleCardDelete]);
    const [duration, setDuratiion] = React.useState('');

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

    // function handleCardLike() {
    //     onCardLike(card);
    // }

    // const isLiked = card.likes.some(i => i._id === currentUser._id);
    // let isLiked = false;


    const cardLikeButtonClassName = (
        `card__like-button ${isLiked ? 'card__like-button_active' : 'card__like-button'}`
    );

    function handleCardLike() {
        console.log(card);
        // console.log(savedMovies.find(i => i.movieId === card.id));
        if (card.id) {
            if (isLiked) {
                setIsLiked(false);
                mainApi
                    .remove(savedMovies.find(i => i.movieId === card.id)._id);
                console.log('карточка удалена');
                return;
            }
            setIsLiked(true);
            console.log('добавлена карточка');
        }

        mainApi
            .addSavedMovies(card)
            .catch((err) => console.log(err))

    }

    function handleCardDelete() {
        console.log(card);
        mainApi
            .remove(card._id)
            .catch((err) => console.log(err))
    }

    return (
        <article id="template" className="card" card={card}>
            {locationMovies ? <a href={card.trailerLink} target="_blank" rel="noreferrer">
                <img
                    // onClick={handleClickImage}
                    className="card__photo"
                    src={'https://api.nomoreparties.co' + card.image.url}
                    alt={card.nameRU}
                />
            </a> : <a href={card.trailer} target="_blank" rel="noreferrer">
                <img
                    // onClick={handleClickImage}
                    className="card__photo"
                    src={card.image}
                    alt={card.nameRU}
                /></a>}
            <div className="card__place">
                <h2 className="card__tittle">{card.nameRU}</h2>
                <div className="card__container">
                    {locationMovies ? <button
                        onClick={handleCardLike}
                        type="button" aria-label="like"
                        className={cardLikeButtonClassName}
                    /> : <button
                        onClick={handleCardDelete}
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