import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Card from '../Card/Card';
import Preloader from '../Preloader/Preloader';

function Movies(props) {
    let searchedMovies = JSON.parse(localStorage.getItem('searchedMovies'));
    let isShortFilms = localStorage.getItem('isShortFilms');
    const [toggle, setToggle] = React.useState(handleSetToggle());
    const [showPreloader, setShowPreloader] = React.useState(true);

    React.useEffect(() => {
        setShowPreloader(false)

    }, [searchedMovies, toggle])

    function handleSetToggle() {
        return (isShortFilms === null) ? false : true;
    }

    async function search(req) {
        localStorage.setItem('lastMoviesSearch', JSON.stringify(req));

        try {
            let listMovies = props.cards.filter((movie) => {
                setShowPreloader(true)
                if (toggle !== (false || null)) {
                    if (movie.duration < 40) {
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

        } catch (err) {
            console.log(err);
            alert(err);
        }
    }

    return (
        <>
            <SearchForm onSubmit={search} toggle={setToggle} setShowPreloader={setShowPreloader} />
            {showPreloader ? <Preloader /> : <></>}
            {(searchedMovies === null) ? <></> : <div className="cards-container" cards={props.cards}>
                {searchedMovies.map(({ ...card }) =>
                    <Card
                        handleCardLike={props.handleCardLike}
                        card={card}
                        savedCards={props.savedCards}
                        {...card}
                    />
                )}

                {(searchedMovies.length === 0) ? <p>Ничего не найдено</p> : <></>}
            </div>
            }
            <button className="more-button">Ещё</button>
        </>
    );
}

export default Movies;