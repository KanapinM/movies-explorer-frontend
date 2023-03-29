import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Card from '../Card/Card';
import Preloader from '../Preloader/Preloader';
import mainApi from '../../utils/MainApi';


function SavedMovies(props) {
    const [toggle, setToggle] = React.useState(false);
    const [showPreloader, setShowPreloader] = React.useState(true);
    const [cards, setCards] = React.useState([]);

    let searchedSavedMovies = JSON.parse(localStorage.getItem('searchedSavedMovies'));
    let savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    React.useEffect(() => {

        mainApi.getSavedMovies()
            .then((res) => {
                localStorage.setItem('savedMovies', JSON.stringify(res));

                setShowPreloader(false);
                console.log(savedMovies);

            })
            .catch((err) => console.log(err))
    }, [searchedSavedMovies, savedMovies])


    async function search(req) {
        localStorage.setItem('lastSavedMoviesSearch', JSON.stringify(req));
        try {
            let listMovies = savedMovies.filter((movie) => {
                setShowPreloader(true)
                if (toggle !== false) {
                    setToggle(true);

                    if (movie.duration < 40) {
                        return movie.nameRU.toLowerCase().includes(req.toLowerCase());
                    }
                }
                if (toggle === false) {
                    setToggle(false);

                    return movie.nameRU.toLowerCase().includes(req.toLowerCase());
                }

            });

            localStorage.setItem('searchedSavedMovies', JSON.stringify(listMovies));

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
                    {searchedSavedMovies.map(({ ...card }) =>
                        <Card

                            onCardLike={props.handleCardDelete}
                            card={card}
                            // key={card.id}
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