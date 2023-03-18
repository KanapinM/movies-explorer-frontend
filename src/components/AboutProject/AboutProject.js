function AboutProject() {
    return (
        <div className="aboutProject">
            <a name="aboutProject" />
            <h3 className="aboutProject__title">
                О проекте
            </h3>
            <div className="aboutProject__container">
                <div className="aboutProject__info">
                    <h4 className="aboutProject__subtitle">
                        Дипломный проект включал 5 этапов
                    </h4>
                    <p className="aboutProject__text">
                        Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
                    </p>
                </div>
                <div className="aboutProject__info">
                    <h4 className="aboutProject__subtitle">
                        На выполнение диплома ушло 5 недель
                    </h4>
                    <p className="aboutProject__text">
                        У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
                    </p>
                </div>
            </div>
            <div className="aboutProject__time">
                <p className="aboutProject__weeks">1 неделя</p>
                <p className="aboutProject__weeks">4 недели</p>
            </div>
            <div className="aboutProject__time">
                <p className="aboutProject__web-type">Back-end</p>
                <p className="aboutProject__web-type">Front-end</p>
            </div>

        </div>
    )
}

export default AboutProject;