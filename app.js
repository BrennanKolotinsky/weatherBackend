const express = require('express');
const app = express();

app.get('/', (req, res) => {
	res.send("Welcome to the home page!");
})

const port = process.env.port;
app.listen(port || 3000, () => {
	console.log("Here!");
});