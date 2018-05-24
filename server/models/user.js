var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true

    }
});

var User = mongoose.model('User', schema);

module.exports = {User};