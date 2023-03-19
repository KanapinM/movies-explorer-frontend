import React from 'react';
import { Switch, Route } from "react-router-dom";

function Footer() {
    let year = (new Date).getFullYear();

    return (
        <footer className="footer">
            <Switch>
                <Route path={"/(|movies|saved-movies)"}>
                    <p className="footer__project-name">Учебный проект Яндекс.Практикум х BeatFilm.</p>
                    <div className="footer__container">
                        <p className="footer__copyright">&#169; {year}</p>
                        <div class="footer__links">
                            <a className="footer__link" href="https://practicum.yandex.ru" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
                            <a className="footer__link" href="https://github.com/KanapinM" target="_blank" rel="noreferrer">Github</a>
                        </div>
                    </div>
                </Route>
            </Switch>
        </footer>
    );
}

export default Footer;