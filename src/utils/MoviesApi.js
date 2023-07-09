export class MoviesApi {
    #onResponse(response) {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(console.error(`Возникла ошибка, код - ${response.status}`));
    }

    constructor(config) {
        this._filmUrl = config.filmUrl;
        this._headers = config.headers;
    }

    getInitialMovies() {
        return fetch(`${this._filmUrl}`, {
            method: 'GET',
            headers: this._headers,
        })
            .then(this.#onResponse)
            .then((res) => {
                return res;
            });
    };

}

const moviesApi = new MoviesApi({

    filmUrl: 'https://api.nomoreparties.co/beatfilm-movies',
    headers: {
        'Content-Type': 'application/json',
    },
    credentials: "include",
});

export default moviesApi;
