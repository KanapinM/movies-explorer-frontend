function Techs() {
    return (
        <section className="techs">
            <a name="techs" />
            <h3 className="techs__title">
                Технологии
            </h3>
            <h4 className="techs__subtitle">
                7 технологий
            </h4>
            <p className="techs__text">
                На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
            </p>
            <ul className="techs__container">
                <li className="techs__name">HTML</li>
                <li className="techs__name">CSS</li>
                <li className="techs__name">JS</li>
                <li className="techs__name">React</li>
                <li className="techs__name">Git</li>
                <li className="techs__name">Express.js</li>
                <li className="techs__name">mongoDB</li>
            </ul>
        </section>
    )
}

export default Techs;