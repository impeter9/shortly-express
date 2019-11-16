const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  if (req.cookies.shortlyid) {
    models.Sessions.get({ hash: req.cookies.shortlyid })
      .then((result) => {
        req.session = result;
        next();
      });
  } else {
    models.Sessions.create()
      .then((session) => {
        models.Sessions.get({ id: session.insertId })
          .then((sessionData) => {
            // console.log(sessionData);
            req.session = sessionData;
            res.cookies['shortlyid'] = { value: sessionData.hash };
            next();
          });
      })
      .catch((err) => {
        console.error(err);
        next();
      });
  }
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

