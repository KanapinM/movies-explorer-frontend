import button from '../../images/search-button.svg';

function SearchForm() {
    return (
        <form className="search">
            <input
                // onChange={handleChange}
                placeholder="Фильм"
                className="search__input"
                name="movie"
                type="movie"
            />
            <button className="search__button">
                <img src={button} alt="лупа" />
            </button>
            <div className='search__container'>
                <p className="search__shortfilms">Короткометражки</p>
                <label className="switch">
                    <input type="checkbox" className="switch__input" />
                    <span className="switch__slider"></span>
                </label>
            </div>
        </form>
    )
}

export default SearchForm;
