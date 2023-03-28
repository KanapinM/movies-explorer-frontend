import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Card from '../Card/Card';
import Preloader from '../Preloader/Preloader';
// import moviesApi from '../../utils/MoviesApi';

// let searchedMovies = JSON.parse(localStorage.getItem('searchedMovies'));
// console.log(searchedMovies);

function Movies(props) {
    const [toggle, setToggle] = React.useState(props.checked || false);

    const [showPreloader, setShowPreloader] = React.useState(true);

    // const [cards, setCards] = React.useState([]);

    // const [someDelete, setSomeDelete] =React.useState(true);

    let savedMovies = JSON.parse(localStorage.getItem('savedMovies'));

    let searchedMovies = JSON.parse(localStorage.getItem('searchedMovies'));
    React.useEffect(() => {
        // if (props.loggedIn) {

        // moviesApi.getInitialMovies()
        //     .then((res) => {
        //         // console.log(res);
        //         localStorage.setItem('movies', JSON.stringify(res));
        //         // console.log(onSubmit);
        //         // console.log(searchedMovies);
        //         // setCards(cards);
        //         setShowPreloader(false)
        //         // if (searchedMovies.length === 0) {
        //         //     return console.log('пусто');
        //         // }
        //         // console.log('не пусто');
        //     })
        //     .catch((err) => console.log(err))

        setShowPreloader(false)
        // console.log(res);
        // }
        // }, [props.loggedIn, searchedMovies, cards, toggle])
    }, [searchedMovies, toggle])


    async function search(req) {
        console.log(req);
        localStorage.setItem('lastMoviesSearch', JSON.stringify(req));
        // props.setLastSearchInput(req);

        // let movies = JSON.parse(localStorage.getItem('movies'));
        // let movies = JSON.parse(moviesApi.getInitialMovies());
        // console.log(moviesApi.getInitialMovies());
        // setCards(req);
        try {
            let listMovies = props.cards.filter((movie) => {
                setShowPreloader(true)
                if (toggle !== false) {
                    console.log("short");
                    if (movie.duration < 40) {
                        setToggle(true);
                        return movie.nameRU.toLowerCase().includes(req.toLowerCase());
                    }
                }
                if (toggle === false) {
                    console.log("norm");
                    setToggle(false);

                    return movie.nameRU.toLowerCase().includes(req.toLowerCase());
                }

            });
            console.log(listMovies);
            console.log(toggle);
            localStorage.setItem('searchedMovies', JSON.stringify(listMovies));
            // console.log(searchedMovies);
            // props.setCards(searchedMovies)
            console.log(toggle);

            // return
        } catch (err) {
            console.log(err);
        }
        // moviesApi.getInitialMovies().then(data=>setCards(data);
    }

    return (
        <>
            <SearchForm onSubmit={search} toggle={setToggle} setShowPreloader={setShowPreloader}
            // lastSearchInput={props.lastSearchInput} />
            />
            {showPreloader ? <Preloader /> : <></>}
            {(searchedMovies === null) ? <></> : <div className="cards-container" cards={props.cards}>
                {searchedMovies.map(({ ...card }) =>
                    <Card
                        // onCardClick={props.onCardClick}
                        // onCardLike={props.onCardLike}
                        // onCardAgreement={props.onCardAgreement}
                        card={card}
                        key={card.id}
                        {...card}
                    />
                )}
                {/* {props.cards.map(({ ...card }) =>
                    <Card
                        onCardClick={props.onCardClick}
                        onCardLike={props.onCardLike}
                        onCardAgreement={props.onCardAgreement}
                        card={card}
                        key={card._id}
                        {...card}
                    />
                )} */}
                {(searchedMovies.length === 0) ? <p>Ничего не найдено</p> : <></>}
            </div>
            }
            <button className="more-button">Ещё</button>
        </>
    );
}

export default Movies;