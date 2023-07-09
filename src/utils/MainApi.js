
export const options = {
    URL: 'https://api.kino.nomoredomains.work',
    movieURL: 'https://api.nomoreparties.co/beatfilm-movies',
    method: 'POST',
    credentials: "include",
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
};

class MainApi {
    constructor(options) {
        this._URL = options.URL;
        this._movieURL = options.movieURL;
        this._headers = options.headers;
        this.credentials = options.credentials;
    }

    _response(res) {
        if (!res.ok) {
            console.log(res.status);
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }

    signup(name, email, password) {
        return fetch(`${this._URL}/signup`, {
            method: 'POST',
            headers: this._headers,
            credentials: this.credentials,
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
            }),
        })
            .then((res) => {
                return this._response(res);
            })
            .then((data) => {
                return data;
            });
    }

    signin(email, password) {
        return fetch(`${this._URL}/signin`, {
            method: 'POST',
            headers: this._headers,
            credentials: this.credentials,
            body: JSON.stringify({
                email: email,
                password: password,
            })
        })
            .then((res) => {
                return this._response(res);
            })
            .then((data) => {
                // document.cookie = data.token;
                return data;
            })
    }

    checkToken(jwt) {
        return fetch(`${this._URL}/users/me`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: this.credentials
        })
            .then((res) => {
                return this._response(res);
            })
    }

    getUserData() {
        return fetch(`${this._URL}/users/me`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: this.credentials,
        })
            .then((res) => {
                return this._response(res);
            })
    }

    editUserData(data) {
        return fetch(`${this._URL}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(data),
            credentials: this.credentials,
        })
            .then((res) => {
                return this._response(res);
            })
    }

    logout() {
        return fetch(`${this._URL}/signout`, {
            method: 'POST',
            headers: this._headers,
            credentials: this.credentials,
        })
            .then((res) => {
                return this._response(res);
            })
    }

    getSavedMovies() {
        return fetch(`${this._URL}/movies`, {
            method: 'GET',
            headers: this._headers,
            credentials: this.credentials,
        })
            .then((res) => {
                return this._response(res);
            })
    }

    addSavedMovies(data) {
        return fetch(`${this._URL}/movies`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                country: data.country,
                director: data.director,
                duration: data.duration,
                year: data.year,
                description: data.description,
                image: `https://api.nomoreparties.co/${data.image.url}`,
                trailer: data.trailerLink,
                thumbnail: `${this._movieURL}${data.image.url}`,
                movieId: data.id,
                nameRU: data.nameRU,
                nameEN: data.nameEN,
            }),
            credentials: this.credentials,

        })
            .then((res) => {
                return this._response(res);
            })

    }

    remove(data) {
        return fetch(`${this._URL}/movies/${data}`, {
            method: 'DELETE',
            headers: this._headers,
            credentials: this.credentials,
        })
            .then((res) => {
                return this._response(res);
            })
            .then((res) => {
                return res;
            });
    }
}

const mainApi = new MainApi(options);

export default mainApi;