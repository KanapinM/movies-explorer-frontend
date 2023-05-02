import React from 'react';
import useResize from 'use-resize';
import SearchForm from '../SearchForm/SearchForm';
import Card from '../Card/Card';
import Preloader from '../Preloader/Preloader';
import { shortMovieDuration, firstMovies, nextStep } from '../../utils/constants';

function Movies(props) {
    const size = useResize();
    const [moreButton, setMoreButton] = React.useState(false);
    const [findedMovies, setFindedMovies] = React.useState({});
    const [step, setStep] = React.useState(0);
    const [numberOfFirstMovies, setNumberOfFirstMovies] = React.useState(0);
    const [showMovies, setShowMovies] = React.useState([]);
    const [paginator, setPaginator] = React.useState();

    let searchedMovies = JSON.parse(localStorage.getItem('searchedMovies'));
    let isShortFilms = localStorage.getItem('isShortFilms');
    const [toggle, setToggle] = React.useState(handleSetToggle());
    const [showPreloader, setShowPreloader] = React.useState(true);
    const [searchedError, setSearchedError] = React.useState(false);

    React.useEffect(() => {
        if (searchedMovies !== null) {
            setFindedMovies(searchedMovies);
        }
    }, []);

    React.useEffect(() => {
        setShowPreloader(false)
        showFirstMovies();
    }, [findedMovies]);

    React.useEffect(() => {
        setMoreButton(paginator < findedMovies.length);
    }, [showMovies]);

    function handleSetToggle() {
        return (isShortFilms === null) ? false : true;
    }

    function showFirstMovies() {
        setNumberOfFirstMovies(size.width > 1279 ? firstMovies.large : size.width > 954 ? firstMovies.medium : size.width > 768 ? firstMovies.small : firstMovies.smallest);

        setPaginator(numberOfFirstMovies);
        setShowMovies(Array.from(findedMovies).slice(0, numberOfFirstMovies));
    }

    function showMoreMovies() {
        setStep(size.width > 1279 ? nextStep.large : size.width > 954 ? nextStep.medium : nextStep.small);

        let nextStepArr = Array.from(findedMovies).splice(paginator, step);
        setShowMovies(showMovies.concat(nextStepArr));
        setPaginator(paginator + step);
    }

    async function search(req) {
        localStorage.setItem('lastMoviesSearch', JSON.stringify(req));
        try {
            let listMovies = props.cards.filter((movie) => {
                setShowPreloader(true)

                if (toggle !== (false || null)) {
                    if (movie.duration < shortMovieDuration) {
                        setToggle(true);
                        localStorage.setItem('isShortFilms', true);

                        return movie.nameRU.toLowerCase().includes(req.toLowerCase());
                    }
                }
                if (toggle === false) {
                    setToggle(false);
                    localStorage.removeItem('isShortFilms');

                    return movie.nameRU.toLowerCase().includes(req.toLowerCase());
                }
            });

            localStorage.setItem('searchedMovies', JSON.stringify(listMovies));
            setFindedMovies(listMovies);

        } catch (err) {
            console.log(err);
            setSearchedError(true);
            alert(err);
        }
    }

    return (
        <>
            <SearchForm onSubmit={search} toggle={setToggle} setShowPreloader={setShowPreloader} searchedError={searchedError} />
            {showPreloader && <Preloader />}
            {(searchedMovies === null) ? <></> : <div className="cards-container" cards={props.cards}>
                {showMovies.map(({ ...card }) =>
                    <Card
                        handleCardLike={props.handleCardLike}
                        card={card}
                        savedCards={props.savedCards}
                        {...card}
                    />
                )}

                {(searchedMovies.length === 0) && <p>Ничего не найдено</p>}
            </div>
            }
            {moreButton && <button className="more-button" onClick={showMoreMovies}>Ещё</button>}
        </>
    );
}

export default Movies;