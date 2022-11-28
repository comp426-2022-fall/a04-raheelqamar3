#!/usr/bin/env node

// import roll function
import {roll} from "./lib/roll.js";

// require express
import express from 'express';
const app = express();

// require minimist and process arguments
import minimist from 'minimist';
const args = minimist(process.argv.slice(2));

// set port to 5000 if no argument is given
const port = args.port || 5000;

// parse arguments as url encoded
app.use(express.urlencoded({extended: true}));

// check endpoint
app.get('/app/', (req, res) => {
    res.status(200).send('200 OK');
})

// default endpoint
app.get('/app/roll/', (req, res) => {
    let sides = 6;
    let dice = 2;
    let rolls = 1;
    res.status(200).send(roll(sides, dice, rolls));
})

app.post('/app/roll/', (req, res) => {
    let sides = 6 || parseInt(req.body.sides);
    let dice = 2 || parseInt(req.body.dice);
    let rolls = 1 || parseInt(req.body.rolls);
    res.status(200).send(roll(sides, dice, rolls));
})

// endpoint for sides
app.get('/app/roll/:sides/', (req, res) => {
    let sides = parseInt(req.params.sides);
    let dice = 2;
    let rolls = 1;
    res.status(200).send(roll(sides, dice, rolls));
})

// endpoint for sides and dice
app.get('/app/roll/:sides/:dice/', (req, res) => {
    let sides = parseInt(req.params.sides);
    let dice = parseInt(req.params.dice);
    let rolls = 1;
    res.status(200).send(roll(sides, dice, rolls));
})

// endpoint for sides, dice, and rolls
app.get('/app/roll/:sides/:dice/:rolls/', (req, res) => {
    let sides = parseInt(req.params.sides);
    let dice = parseInt(req.params.dice);
    let rolls = parseInt(req.params.rolls);
    res.status(200).send(roll(sides, dice, rolls));
})

// 404 error
app.get('*', (req, res) => {
    console.error('error encountered');
    res.status(404).send('404 NOT FOUND');
})

// start server
app.listen(port, () => {
    console.log(`Server started on port ${port}\n`)
});