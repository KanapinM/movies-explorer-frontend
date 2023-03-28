import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Card from '../Card/Card';
import Preloader from '../Preloader/Preloader';
import mainApi from '../../utils/MainApi';


function SavedMovies(props) {
    const [toggle, setToggle] = React.useState(false);
    const [showPreloader, setShowPreloader] = React.useState(true);
    const [cards, setCards] = React.useState([]);
    // const [someDelete, setSomeDelete] =React.useState(true);
    const [somethingSearched, setSomethingSearched] = React.useState(true);


    // function handleCardDelete() {
    //     console.log('Обработка удаления фильма');
    // }

    let searchedSavedMovies = JSON.parse(localStorage.getItem('searchedSavedMovies'));
    let savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    React.useEffect((res) => {

        mainApi.getSavedMovies()
            .then((res) => {
                console.log(res);
                localStorage.setItem('savedMovies', JSON.stringify(res));
                // console.log(props.onSubmit);
                console.log(searchedSavedMovies);
                console.log(savedMovies);
                // setCards(res);
                // setCards(searchedSavedMovies);
                setShowPreloader(false);

                if (searchedSavedMovies.length === 0) {
                    return console.log('пусто');
                }
                console.log('не пусто');
            })
            .catch((err) => console.log(err))
        // }, [searchedSavedMovies, props.onSubmit, setCards, savedMovies, somethingSearched])
    }, [searchedSavedMovies, props.onSubmit, savedMovies, somethingSearched, toggle])


    async function search(req) {
        console.log(req);
        localStorage.setItem('lastSavedMoviesSearch', JSON.stringify(req));
        setSomethingSearched(true);
        try {
            let listMovies = savedMovies.filter((movie) => {
                setShowPreloader(true)
                if (toggle !== false) {
                    console.log("short");
                    setToggle(true);

                    if (movie.duration < 40) {
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
            localStorage.setItem('searchedSavedMovies', JSON.stringify(listMovies));
            console.log(searchedSavedMovies);
            console.log(toggle);
            // setCards(searchedSavedMovies);
            return
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>

            <SearchForm onSubmit={search} toggle={setToggle} setShowPreloader={setShowPreloader} />
            {showPreloader ? <Preloader /> : <></>}
            {(searchedSavedMovies === null) ? <></> :
                <div className="cards-container" cards={cards}>
                    {savedMovies.map(({ ...card }) =>
                        <Card
                            // onCardClick={props.onCardClick}
                            onCardLike={props.handleCardDelete}
                            // onCardAgreement={props.onCardAgreement}
                            card={card}
                            key={card.id}
                            {...card}
                        />
                    )}

                    {(searchedSavedMovies.length === 0) ? <p>Ничего не найдено</p> : <></>}
                </div>
            }
        </>
    );
}

export default SavedMovies;