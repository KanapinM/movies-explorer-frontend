import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Card from '../Card/Card';
import Preloader from '../Preloader/Preloader';
import mainApi from '../../utils/MainApi';


function SavedMovies(props) {
    const [toggle, setToggle] = React.useState(false);
    const [showPreloader, setShowPreloader] = React.useState(true);

    console.log(props.cards);

    React.useEffect(() => {
        props.setSearchedSavedMovies(false);
        // if (props.cards === undefined) {
        //     setShowPreloader(true);
        //     return;
        // }

        // props.setSavedCards(props.cards);
        setShowPreloader(false);
    }, [])



    async function search(req) {
        try {
            let listMovies = props.cards.filter((movie) => {
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

            props.setSearchedSavedMovies(listMovies);
            setShowPreloader(false);
            return
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>

            <SearchForm onSubmit={search} toggle={setToggle} setShowPreloader={setShowPreloader} />
            {showPreloader ? <Preloader /> : <></>}
            {(props.searchedSavedMovies === false || undefined || null)
                ?
                (<div className="cards-container" cards={props.cards}>
                    {props.cards.map(({ ...card }) =>
                        <Card

                            handleCardDelete={props.handleCardDelete}
                            card={card}
                            key={card.id}
                            // isLiked={true}
                            // setIsLiked={props.setIsLiked}
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
                            key={card.id}
                            // isLiked={true}
                            // setIsLiked={props.setIsLiked}
                            {...card}
                        />
                    )}

                    {(props.searchedSavedMovies.length === 0) ? <p>Ничего не найдено</p> : <></>}
                </div>
            }
        </>
    );
}

export default SavedMovies;