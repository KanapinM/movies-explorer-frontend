import avatar from '../../images/avatar.jpg';
import Portfolio from '../Portfolio/Portfolio';

function AboutMe() {
    return (
        <div className="aboutMe">
            <a name="aboutMe" />
            <h3 className="aboutMe__title">
                Студент
            </h3>
            <div className="aboutMe__container">
                <div>
                    <h4 className="aboutMe__name">Виталий</h4>
                    <p className="aboutMe__info">
                        Фронтенд-разработчик, 30 лет
                    </p>
                    <p className="aboutMe__text">
                        Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить.
                        С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
                    </p>
                    <a className="aboutMe__link" href="https://github.com/KanapinM">Github</a>
                </div>
                <img className="aboutMe__avatar" src={avatar} alt="avatar"></img>
            </div>
            <Portfolio />
        </div>
    )
}

export default AboutMe;