const express = require('express');
const bodyParser = require('body-parser');  // get the post request information
const pino = require('express-pino-logger')();
const cors = require('cors');
const proxy = require('express-http-proxy');

const axios = require('axios'); // use to send API requests!
const path = require('path'); // this allows us to easily combine paths
require('dotenv').config({path: path.join(__dirname, '.env')}); // this allows us to read in variables from our .env file

const http = require("http");
const apiKey = process.env.WEATHER_API_KEY;

// created a mongodb server hosted on mongoatlas to hold users!
const mongoConnection = require('./mongoDB/index.js');
const mongoFunctionality = require('./mongoFunctionality/index.js');
const mongoDBConnection = mongoConnection.connection; // pass this client in the future to the other calls and then do .then -- like this: https://stackoverflow.com/questions/18650890/keeping-open-a-mongodb-database-connection
const mongoDBClient = mongoConnection.client;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(cors({origin: '*'})); // allows cross platform http requests to be made
app.use(bodyParser.json());

app.post('/weather', (req, res) => {
	const location = req.body.location === undefined ? "Vancouver" : req.body.location;
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
	axios(
	{
	    method: "POST", 
	    url: url,
	    crossDomain: true, 
	    data: {
	    }
	}).then((response) => {
        res.setHeader('Content-Type', 'application/json');
  		res.send(JSON.stringify({data: response.data}));
    });
});

app.get('/weather2', (req, res) => {
	const location = req.query.location === undefined ? "Vancouver" : req.query.location;
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
	axios(
	{
	    method: "POST", 
	    url: url,
	    crossDomain: true, 
	    data: {
	    }
	}).then((response) => {
        res.setHeader('Content-Type', 'application/json');
  		res.send(JSON.stringify({data: response.data}));
    });
});

app.post('/authenticate', async (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	const user = await mongoFunctionality.findUser(mongoDBConnection, mongoDBClient, username, password);
	res.send({
		auth: user !== null ? 1: 0
	});
});

const port = process.env.port;
app.listen(port || 8080, () => {
});