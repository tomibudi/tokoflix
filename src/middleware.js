import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { match, Router } from 'react-router';
import Meta from 'react-helmet';
import reducers from './redux/root-reducers';
import routes from './routes';

export default (req, res) => {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    }
    else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }
    else if (renderProps) {
      if (process.env.NODE_ENV === 'development') {
        res.status(200).send(`
          <html>
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width">
              <title>TokoFlix</title>
              <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.4.1/css/swiper.css">
              </head>
            <body>
              <div id='app'></div>
              <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
              <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js" integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut" crossorigin="anonymous"></script>
              <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossorigin="anonymous"></script>
              <script src='/bundle.js'></script>
              
            </body>
          </html>
        `);
      }
      else if (process.env.NODE_ENV === 'production') {
        const store = createStore(reducers);
       
            const preloadedState = store.getState();
            const html = renderToString(
              <Provider store={store}>
                <Router {...renderProps} />
              </Provider>
            );
            const head = Meta.rewind(); // eslint-disable-line
            res.status(200).send(`
              <html>
                <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width">
                  <title>TokoFlix</title>
                  ${head.title.toString()}
                  ${head.meta.toString()}
                  ${head.link.toString()}
                  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
                  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.4.1/css/swiper.min.css">
                  <link rel="stylesheet" type="text/css" href="/bundle.css">
                </head>
                <body>
                  <div id='app'>${html}
                  </div>
                  <script>
                    window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}
                  </script>
                  <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js" integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossorigin="anonymous"></script>
                  <script src='/bundle.js'></script>
                </body>
              </html>
            `);
            return;
          // });
      }
    }
    else {
      res.status(404).send('Not found');
    }
  });
};
