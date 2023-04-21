import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Card from '../Card/Card';
import Preloader from '../Preloader/Preloader';


function Movies(props) {
    const [toggle, setToggle] = React.useState(props.checked || false);

    const [showPreloader, setShowPreloader] = React.useState(true);

    let searchedMovies = JSON.parse(localStorage.getItem('searchedMovies'));

    React.useEffect(() => {
        setShowPreloader(false)

    }, [searchedMovies, toggle])


    async function search(req) {
        localStorage.setItem('lastMoviesSearch', JSON.stringify(req));

        try {
            let listMovies = props.cards.filter((movie) => {
                setShowPreloader(true)
                if (toggle !== false) {
                    if (movie.duration < 40) {
                        setToggle(true);
                        return movie.nameRU.toLowerCase().includes(req.toLowerCase());
                    }
                }
                if (toggle === false) {
                    setToggle(false);

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
                        key={card.id}
                        savedCards={props.savedCards}
                        // isLiked={props.isLiked}
                        // setIsLiked={props.setIsLiked}
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