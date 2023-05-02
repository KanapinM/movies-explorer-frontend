import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Card from '../Card/Card';
import Preloader from '../Preloader/Preloader';
import { shortMovieDuration } from '../../utils/constants';

function SavedMovies(props) {
    const [toggle, setToggle] = React.useState(false);
    const [showPreloader, setShowPreloader] = React.useState(true);
    const [searchedError, setSearchedError] = React.useState(false);

    React.useEffect(() => {
        props.setSearchedSavedMovies(false);

        setShowPreloader(false);
    }, [])

    async function search(req) {
        try {
            let listMovies = props.cards.filter((movie) => {
                setShowPreloader(true)
                if (toggle !== false) {
                    setToggle(true);
                    if (movie.duration < shortMovieDuration) {
                        return movie.nameRU.toLowerCase().includes(req.toLowerCase());
                    }
                }
                if (toggle === false) {
                    setToggle(false);
                    return movie.nameRU.toLowerCase().includes(req.toLowerCase());
                }

            });

            props.setSearchedSavedMovies(listMovies);
            setShowPreloader(false);

            return
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
            {(props.searchedSavedMovies === false || undefined || null)
                ?
                (<div className="cards-container" cards={props.cards}>
                    {props.cards.map(({ ...card }) =>
                        <Card
                            handleCardDelete={props.handleCardDelete}
                            card={card}
                            {...card}
                        />
                    )}
                </div>)
                :
                <div className="cards-container" >
                    {props.searchedSavedMovies.map(({ ...card }) =>
                        <Card
                            handleCardDelete={props.handleCardDelete}
                            card={card}
                            savedCards={props.savedCards}
                            {...card}
                        />
                    )}

                    {(props.searchedSavedMovies.length === 0) && <p>Ничего не найдено</p>}
                </div>
            }
        </>
    );
}

export default SavedMovies;