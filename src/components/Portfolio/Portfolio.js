
function Portfolio() {
    return (
        <div className="portfolio">
            <h3 className="portfolio__title">
                Портфолио
            </h3>
            <ul className="portfolio__container">
                <a className="portfolio__link" href="https://kanapinm.github.io/first-project/">
                    <h4 className="portfolio__site-type">Статичный сайт</h4>
                    <p className="portfolio__arrow">↗</p>
                </a>
                <a className="portfolio__link" href="https://kanapinm.github.io/russian-travel/">
                    <h4 className="portfolio__site-type">Адаптивный сайт</h4>
                    <p className="portfolio__arrow">↗</p>
                </a>
                <a className="portfolio__link" href="https://kanapinm.github.io/react-mesto-auth/">
                    <h4 className="portfolio__site-type">Одностраничное приложение</h4>
                    <p className="portfolio__arrow">↗</p>
                </a>
            </ul>

        </div>
    )
}

export default Portfolio;