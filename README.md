# react-boilerplate

This project is meant to be used as a boilerplate code for web projects based on React. It comes with an opinionated base folder structure and all libraries pre-configured.

## Technologies and Libraries

### UI and Navigation
>- [react]
>- [react-router-dom]

### State Management and Side-Effects
>- [redux] - pre-configured to use Redux DevTools [extension]. You **must** install it for it to work.
>- [redux-saga]


### HTTP Requests
>- [axios]

### Styling
>- [sass]

### Minification, Compression and Bundling
>- [webpack] - using [babel] to parse JSX

### Linting
>- [eslint] - based on [Airbnb]

## Installation

```sh
$ cd react-boilerplate
$ npm install
```

## Scripts

### Development

Run the project locally.

```sh
$ npm start
```

### Building

Create a **dist** directory with the production build of the app, ready for deployment. By default it runs the lint script right before building.

```sh
$ npm run build
```

Run the building script without linting.

```sh
$ npm run build:nocheck
```

Serve the generated assets locally using **http-server** package, for testing purposes. You **must** have it installed for it to work.

```sh
$ npm i http-server -g
$ npm run serve
```

### Utilities

#### Linting

```sh
$ npm run lint
```

#### Delete node_modules (*This script won't work on Windows*)

```sh
$ npm run clean
```

## To-dos

### High Priority

- Create a Sass folder and file structure
- Use Request / Success / Error pattern in Redux Saga
- Rearrange overall folder structure and then add a back-end boilerplate code as well

### Medium Priority

- Add browser support config to Babel
- Restructure the components / pages
- Implement Jest for testing purposes

### Low Priority

- Improve both ESLint and Webpack configuration

## Contributing

Feel free to contribute and open pull requests or issues.

## Credits

Based on [react-base], from Thiago L. Lima.

## License

[MIT]


[//]: # (Reference Links)


[react]: <https://reactjs.org/>
[react-router-dom]: <https://reactrouter.com/web>
[redux]: <https://redux.js.org/>
[extension]: <https://github.com/zalmoxisus/redux-devtools-extension>
[redux-saga]: <https://redux-saga.js.org/>
[axios]: <https://github.com/axios/axios>
[sass]: <https://sass-lang.com/>
[webpack]: <https://webpack.js.org/>
[babel]: <https://babeljs.io/>
[eslint]: <https://eslint.org/>
[Airbnb]: <https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb>

[react-base]: <https://github.com/tlima/react-base>

[MIT]: <https://github.com/lucasfrsi/react-boilerplate/blob/master/LICENSE>
