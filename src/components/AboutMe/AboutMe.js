import avatar from '../../images/avatar.jpg';
import Portfolio from '../Portfolio/Portfolio';

function AboutMe() {
    return (
        <section id="about-me" className="about-me">
            <h3 className="about-me__title">
                Студент
            </h3>
            <div className="about-me__container">
                <div>
                    <h4 className="about-me__name">Виталий</h4>
                    <p className="about-me__info">
                        Фронтенд-разработчик, 30 лет
                    </p>
                    <p className="about-me__text">
                        Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить.
                        С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
                    </p>
                    <a className="about-me__link" href="https://github.com/KanapinM" target="_blank" rel="noreferrer">Github</a>
                </div>
                <img className="about-me__avatar" src={avatar} alt="avatar"></img>
            </div>
            <Portfolio />
        </section>
    )
}

export default AboutMe;