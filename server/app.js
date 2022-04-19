const express = require('express');
const morgan = require('morgan');
const app = express();

//this spaces my json obj so I can read it more easily
app.set('json spaces', 2);

//built in middleware allows me to access req.body
app.use(express.json());

app.use(morgan('dev'));

let data = [
	{
		todoItemId: 0,
		name: 'an item',
		priority: 3,
		completed: false
	},
	{
		todoItemId: 1,
		name: 'another item',
		priority: 2,
		completed: false
	},
	{
		todoItemId: 2,
		name: 'a done item',
		priority: 1,
		completed: true
	}
];

app.get('/', function (req, res) {  
	res.status(200).send({status: "Ok"})
 });

app.get('/api/TodoItems', function (req, res) {  
	res.status(200).send(data);
 });

app.get('/api/TodoItems/:number', function (req, res) { 
	let number = req.params.number;
	let item;
	for(let i=0; i < data.length; i++){
		if(data[i].todoItemId == number){
			item = data[i];
		}
	}
	res.status(200).send(item);
 });

app.post('/api/TodoItems/', function (req, res) { 
	for(let i=0; i < data.length; i++){
		if(data[i].todoItemId === req.body.todoItemId){
			data[i] = req.body
		} else {
			data.push(req.body);
		}
	}
	res.status(201).send(req.body);
 });

 app.delete('/api/TodoItems/:number', function (req, res) { 
	let number = req.params.number;
	let item;
	for(let i=0; i < data.length; i++){
		if(data[i].todoItemId == number){
			item = data.splice(i, 1);
		}
	}
	res.status(200).send(item[0]);
 });


module.exports = app;
