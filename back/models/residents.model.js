
const mongoose = require('mongoose');

//user schema

const residentSchema = mongoose.Schema({
    name: { type: 'string', required: true },
    gender: { type: 'string', required: true },
    age: { type: 'Number', required: true },
});

module.exports = mongoose.model('Resident', residentSchema);

