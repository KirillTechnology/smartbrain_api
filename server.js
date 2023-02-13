const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const app = express();

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        port: 5432,
        user: 'kirillsemenov',
        password: '',
        database: 'smart_brain'
    }
});


app.use(express.json());
app.use(cors());

app.get('/', (req, res) => { res.send('Root page') })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })
app.post('/imageURL', (req, res) => { image.handleClarifaiAPI(req, res) })
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.listen(3001, () => { console.log('Server running. Port: 3001') });