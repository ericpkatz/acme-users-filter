const express = require('express');
const swig = require('swig');
const path = require('path');
const db = require('./db');
swig.setDefaults({ cache: false });

const app = express();
app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.set('view engine', 'html');
app.engine('html', swig.renderFile);

app.use('/', require('./routes'));

const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`listening on port ${port}`));

db.seed();
