
function Portfolio() {
    return (
        <section className="portfolio">
            <h3 className="portfolio__title">
                Портфолио
            </h3>
            <div className="portfolio__container">
                <a className="portfolio__link" href="https://kanapinm.github.io/first-project/" target="_blank" rel="noreferrer">
                    <h4 className="portfolio__site-type">Статичный сайт</h4>
                    <p className="portfolio__arrow">↗</p>
                </a>
                <a className="portfolio__link" href="https://kanapinm.github.io/russian-travel/" target="_blank" rel="noreferrer">
                    <h4 className="portfolio__site-type">Адаптивный сайт</h4>
                    <p className="portfolio__arrow">↗</p>
                </a>
                <a className="portfolio__link" href="https://kanapinm.github.io/react-mesto-auth/" target="_blank" rel="noreferrer">
                    <h4 className="portfolio__site-type">Одностраничное приложение</h4>
                    <p className="portfolio__arrow">↗</p>
                </a>
            </div>

        </section>
    )
}

export default Portfolio;