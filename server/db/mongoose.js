const mongoose = require('mongoose');

mongoose.connect('mongodb://thekhi:kdlaem1972@ds119060.mlab.com:19060/dang-dang-yum')
.then(() => {
    console.log('Successfully connected to database...')
}, err => {
    console.log('unable to connect.')
});

module.exports = {
    mongoose
};