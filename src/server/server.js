import express from 'express';
import config from './config'
import webpack from 'webpack';
import React from 'react'
import {renderToString} from 'react-dom/server'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { renderRoutes } from 'react-router-config'
import { StaticRouter } from 'react-router-dom'
import reducer from '../frontend/reducers'
import initialState from '../frontend/initialState'
import serverRoutes from '../frontend/routes/serverRoutes'

const { ENV, PORT } = config

const app = express();

if(ENV === 'development'){
    console.log('Develpoment config');
    const webpackConfig = require('../../webpack.config');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const compiler = webpack(webpackConfig);
    const serverConfig = { serverSideRender: true, publicPath: webpackConfig.output.publicPath };

    app.use(webpackDevMiddleware(compiler, serverConfig));
    app.use(webpackHotMiddleware(compiler));
}

const setResponse = (html) => {
    return(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="assets/app.css" type="text/css">
        <title>PLatzi Video</title>
    </head>
    <body>
        <div id="app">${html}</div>
        <script src="assets/app.js" type="text/javascript"></script>
    </body>
    </html>
    `)
}

const renderApp = (req, res) =>{
    const store = createStore(reducer, initialState);
    const html = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.url} context={{}}>
                {renderRoutes(serverRoutes)}
            </StaticRouter>
        </Provider>,
    );

    res.send(setResponse(html));
}

app.get('*', renderApp);

app.listen(PORT, (err)=>{
    if(err) console.log(err);
    else console.log(`Server running on port ${PORT}`);
})