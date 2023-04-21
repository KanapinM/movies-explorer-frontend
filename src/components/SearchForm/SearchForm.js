import button from '../../images/search-button.svg';
import React from 'react';
import { useLocation } from 'react-router-dom';


function SearchForm({
    onSubmit,
    toggle,
}) {
    let lastMoviesSearch = JSON.parse(localStorage.getItem('lastMoviesSearch'));
    let lastSavedMoviesSearch = JSON.parse(localStorage.getItem('lastSavedMoviesSearch'));
    const location = useLocation();
    const locationMovies = ['/movies'].includes(location.pathname);

    const [еmptyForm, setEmptyForm] = React.useState(false);
    const [checked, setChecked] = React.useState();
    const [input, setInput] = React.useState('');
    React.useEffect(() => {
        if (input === '') {
            setEmptyForm(true);
        } else {
            setEmptyForm(false);
        }
    }, [input]);
    React.useEffect(() => {
        setEmptyForm(false);
        setInput(input);
    }, [input, checked]);

    function handleSwitchClick() {
        if (checked === false) {
            setChecked(true);
            toggle(checked);
            return checked;
        }
        setChecked(false);
        toggle(checked);
        return checked;
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (input === '') {
            setEmptyForm(true);
            return;
        }

        onSubmit(input);

    }

    function handleChange(e) {
        setInput(e.target.value);
    }
    return (
        <form >
            <div className="search">
                {locationMovies ? <input
                    onChange={handleChange}
                    placeholder={lastMoviesSearch || 'Фильм'}
                    className="search__input"
                    name="movie"
                    type="search"
                    value={input}
                    required
                /> :
                    <input
                        onChange={handleChange}
                        placeholder={lastSavedMoviesSearch || 'Фильм'}
                        className="search__input"
                        name="movie"
                        type="search"
                        value={input || ""}
                        required
                    />
                }
                <button className="search__button" onClick={handleSubmit} >
                    <img src={button} alt="лупа" />
                </button>
                <div className='search__container'>
                    <p className="search__shortfilms">Короткометражки</p>
                    <label className="switch">
                        <input type="checkbox" onChange={handleSwitchClick} className="switch__input" />
                        <span className="switch__slider"></span>
                    </label>
                </div>
            </div>
            {еmptyForm ? <p className="search-error">Нужно ввести ключевое слово</p> : <></>}
        </form>
    )
}

export default SearchForm;