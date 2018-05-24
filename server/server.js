var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
 
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.port.ENV || 3000;

//app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    //console.log(req.body);
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos})
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findById(id).then((doc) => {
        if(!doc) res.status(404).send();
        res.send({doc});
    }).catch((e) => res.send());
});

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)) return res.status(404).send();

    Todo.findByIdAndRemove(id).then((todo) => {
        if(!todo) res.status(404).send();
        res.status(200).send({todo});
    }).catch((e) => res.status(400).send());
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}...`)
});

// var Todo = mongoose.model('Todo', {
//     text: {
//         type: String
//     },
//     completed: {
//         type: Boolean
//     },
//     completedAt: {
//         type: Number
//     }
// });

// var newTodo = new Todo({
//     text: 'Cook dinner'
// });

// newTodo.save().then((doc) => {
//     console.log('Saved todo', doc);
// }, err => {
//     console.log(err);
// });




// var todo = new Todo({ text: 'Cook dinner' });
// todo.save(function (err) {
//   if (err) return handleError(err);
//   // saved!
//   console.log('Saved todo', todo);
// });
// Todo.create({ text: '' }, function (err, doc) {
//     if (err) return console.log(err);
//     // saved!
//     console.log('success', doc);
//   });


// var userOne = new User({
//     email: 'kiattisak@yahoo.com'
// });
// userOne.save().then((doc) => {
//     console.log(doc);
// }, err => {
//     console.log(err);
// });

module.exports = {app};