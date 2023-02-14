const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const PORT = process.env.PORT;

const app = express();

const db = knex({
    client: 'pg',
    connection: {
        host: 'dpg-cflgt0pgp3ju5h43d4u0-a',
        port: 5432,
        user: 'smartbrain_user',
        password: '3VvVS3zBDmB9VSEWSFDggbHQuJ8i3xL7',
        database: 'smartbrain_b305'
    }
});

// const db = knex({
//     client: 'pg',
//     connection: {
//         host: '127.0.0.1',
//         port: 5432,
//         user: 'kirillsemenov',
//         password: '',
//         database: 'smart_brain'
//     }
// });


app.use(express.json());
app.use(cors());

app.get('/', (req, res) => { res.send('Root page') })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })
app.post('/imageURL', (req, res) => { image.handleClarifaiAPI(req, res) })
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })


app.listen(PORT || 3001, () => { console.log(`Server running. Port: ${PORT || 3001}`) });