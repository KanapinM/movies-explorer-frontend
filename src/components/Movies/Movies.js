import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Card from '../Card/Card';


function Movies(props) {

    return (
        <>
            <SearchForm />
            <div className="cards-container">
                {props.cards.map(({ ...card }) =>
                    <Card
                        onCardClick={props.onCardClick}
                        onCardLike={props.onCardLike}
                        onCardAgreement={props.onCardAgreement}
                        card={card}
                        key={card._id}
                        {...card}
                    />
                )}
            </div>
            <button className="more-button">Ещё</button>
        </>
    );
}

export default Movies;