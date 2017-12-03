/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app) {

  //FIXME: device valid check, when region is not proper, return json_status..
  app.param('device', function(req, res, next, device){
    req.device = device;
    next();
  });

  //FIXME: region valid check, when region is not proper, return json_status..
  app.param('region', function(req, res, next, region){
    req.region = region;
    next();
  })

  /* Insert routes below */
  app.use('/:device/:region/players', require('./core/api/v3/player'));
  app.use('/:device/:region/player-profiles', require('./core/api/v3/player-profile'));
  // app.use('/api/users', require('./api/user'));

  /* For Auth */
  // app.use('/auth', require('./auth').default);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
    });
}