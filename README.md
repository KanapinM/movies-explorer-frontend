# movies-explorer-frontend

ссылка на макет https://www.figma.com/file/BtoEmGudXxtiGIYD8hIqy8/Diploma-(Copy)?node-id=891%3A3857

# Проект Movies

### Описание:

Проект `Movies`, включает frontend и backend(https://github.com/KanapinM/movies-explorer-api) части приложения со следующими возможностями: авторизации и регистрации пользователей, поиск фильмов и сохранение в избранное.

Проект содержит в себе базу данных с фильмами с возможностью поиска, по результатам которого вы можете ознакомиться с их длительностью, постерами, и посмотреть трейлер на ютубе, нажав на изображение. Это небольшой аналог кинопоиска, в котором Вы можете собрать свою подборку любимых фильмов, а также подобрать интересные короткометражки, если время на кино для вас ограничено.

В проекте реализована регистрация и авторизация с сохранением данных о пользователе и его любимых фильмов.

Все запросы на авторизацию, регистрацию и проверку токена работают через собственный backend `https://api.kino.nomoredomains.work` с сохранением данных в MongoDB.

### Какие технологии использовались:

Проект полностью собран с помощью React.js, что позволяет увеличить скорость работы и снизить общей вес проекта. Используются функциональные компоненты, декларативный подход, а так же react-хуки useState и useEffect. Реализованы регистрация и авторизация пользователей. Для авторизации используется ProtectedRouter и JWT токен, который сохраняется в локальном хранилище пользователя.

Также при работе с проектом использовались флекс-бокс вёрстка, гриды и относительные единицы измерения для обеспечения адаптивного отображения страницы, также на странице применяются попапы для отоброжения полей ввода и отображения карточки в большем размере, по которой был произведен клик.

### Cтек Frontend:

- React
- React-Router
- JavaScript
- webpack
- Babel
- API запросы
- html
- CSS
- Flexbox
- Grid
- БЭМ
- SPA (Single Page Application)

### IP и домен Backend:

Backend https://api.kino.nomoredomains.work

### Ознакомиться с проектом можно по ссылке ниже:

https://kino.nomoredomains.work

### Авторизация:

Вы можете зарегестрироваться на сайте или же воспользоваться имеющимся профилем<br>
mk1@mail.ru<br>
123456<br>
Рекомндую начать поиск с одной буквы (например "а"), так как библиотека фильмов сможет удивить Вас своей оригинальностью.

## How to use

Clone down this repository. You will need **node and npm** installed globally on your machine.<br>

```
# to clone down the repository
$ git clone https://github.com/KanapinM/movies-explorer-frontend.git

# to open the target directory
$ cd movies-explorer-api
```

### Installation

```
# to install dependencies
$ npm install

# to start server at localhost:3000
$ npm run start

# to build app
$ npm run build
```
