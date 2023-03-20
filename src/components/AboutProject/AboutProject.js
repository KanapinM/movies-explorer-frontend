function AboutProject() {
    return (
        <section id="about-project" className="about-project">
            <h3 className="about-project__title">
                О проекте
            </h3>
            <div className="about-project__container">
                <div className="about-project__info">
                    <h4 className="about-project__subtitle">
                        Дипломный проект включал 5 этапов
                    </h4>
                    <p className="about-project__text">
                        Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
                    </p>
                </div>
                <div className="about-project__info">
                    <h4 className="about-project__subtitle">
                        На выполнение диплома ушло 5 недель
                    </h4>
                    <p className="about-project__text">
                        У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
                    </p>
                </div>
            </div>
            <div className="about-project__time">
                <p className="about-project__weeks">1 неделя</p>
                <p className="about-project__weeks">4 недели</p>
            </div>
            <div className="about-project__time">
                <p className="about-project__web-type">Back-end</p>
                <p className="about-project__web-type">Front-end</p>
            </div>

        </section>
    )
}

export default AboutProject;