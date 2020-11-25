require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({
    origin: true
}));

app.use(express.json());
app.use(express.static('public'));

//Endpoints
app.use('/api/usuarios', require('./routes/usuarios'));

app.listen(process.env.PORT);