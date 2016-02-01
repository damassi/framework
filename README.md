# DAM EDITOR FRAMEWORK

Starting point for building CRUD applications on top of the DAM. See [Assignment Desk](https://github.com/TimeInc/edit-rights-www) for a complete implementation, and these instructions for developing a new section https://github.com/TimeInc/edit-rights-www/pull/111.

![framework](https://cloud.githubusercontent.com/assets/236943/12693735/1722445c-c6c8-11e5-9dd9-12b1b121477d.gif)

(Excuse the duplicate record bug in the list view; something up with the DAM :)

#### Support
If you have questions, please contact the DAM team on slack #ape-dam

#### Stack

[React](https://facebook.github.io/react/), [React Router](https://github.com/rackt/react-router), [Redux](https://github.com/rackt/redux), [Karma](http://karma-runner.github.io/0.13/index.html), [Mocha](https://mochajs.org/) and [Restify](https://github.com/restify/node-restify) as an API layer.

## Installation

Paste your artifactory username and password into this command:
> echo "registry=http://timeinc.artifactoryonline.com/timeinc/api/npm/npm" > ~/.npmrc && curl -u user:pw "http://timeinc.artifactoryonline.com/timeinc/api/npm/auth" >> ~/.npmrc

```
git clone https://github.com/TimeInc/dam-edit-framework-www
cd dam-edit-framework-www
npm install
```

## Production
For debugging Elastic Search queries, a logger has been mounted at `window._editorLogger.toggle()`; enable it via your browser console.

## Development

Note to developers: Though we're using ES6 Classes to build our React `<Components />`, one should never ever extend a class *further* than React.Component, or inherit from anything *other than* React.Component -- they're meant to be simple containers for rendering and composing, and the useful `@decorator` syntax will only work with them. Use functional composition over inheritance instead!

### Developing a new section:
See https://github.com/TimeInc/edit-rights-www/pull/111 for a complete walk through; commits contain the full dev flow, built from scratch.

### HTML and Assets
In dev, html and assets are located in `public`. When building to production, the html template is located in `shared/templates` and everything is copied over to dist. The logo is located in `assets/images`.

### Testing
Tests are co-located with their sources within a `__test__` directory. This pattern encourages broader testing practices and makes it easier to find stuff.

### Feature Flags

Defined in `webpack.config.dev` and `webpack.config.prod`, under plugins, you will find two magic variables:

`__DEV__`,
`__TEST__` and
`process.node.ENV`

These can be used for toggling prod vs dev settings, such as the JSON explorer, the debugger used within <Exists /> and Redux logging. (Others can be added as necessary.)

When building for dev, `__DEV__` is set to `true`, and when building for prod, it is set to `false`. Same patter applies to `__TEST__`

```
npm run dev
open http://localhost:8080
open http://localhost:8090 (api)

npm start
npm build - Minifies all assets, generates html, and outputs to `dist`

NODE_ENV=prod LOG_LEVEL=DEBUG npm start | bunyan -o short

npm test
npm run test:watch
npm run lint
npm run build
npm run css (launches a browsersync server to auto-inject changes)
npm run css:build
npm run css:watch
```
