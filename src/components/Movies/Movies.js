import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Card from '../Card/Card';
import Footer from '../Footer/Footer';


function Movies(props) {

    return (
        <>
            <Header />
            <SearchForm />
            <div className="cardsContainer">
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
            <Footer />
        </>
    );
}

export default Movies;