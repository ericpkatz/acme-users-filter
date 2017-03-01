const express = require('express');
const swig = require('swig');
const path = require('path');
const db = require('./db');
swig.setDefaults({ cache: false });

const app = express();
app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.set('view engine', 'html');
app.engine('html', swig.renderFile);

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

const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`listening on port ${port}`));

db.seed();
