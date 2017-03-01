const app = require('express').Router();
const db = require('./db');

module.exports = app;

const renderUsers = (req, res, next)=> {
  Promise.all([
    db.models.User.findUsersByFirstLetterOfLastName(req.params.letter),
    db.models.User.generateUserMap()
  ])
    .then( result => {
      res.render('index', { keys: Object.keys(result[1]).sort(), map: result[1], users: result[0], letter: req.params.letter } );
    })
    .catch(next);
};

app.get('/users/filter/:letter', renderUsers);

app.get('/', renderUsers);

app.post('/regenerate', (req, res, next)=> {
  db.seed()
    .then( ()=> res.redirect('/'))
    .catch(next);
});
