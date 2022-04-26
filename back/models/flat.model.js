
const mongoose = require('mongoose');

//user schema

const flatSchema = mongoose.Schema({
    type: { type: 'string', required: true },
    block: { type: 'string', required: true },
    flatno: { type: 'Number', required: true },
    flatimg: { type: 'string', required: true },
    resident: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resident",
        required: true
    }],
});

module.exports = mongoose.model('Flat', flatSchema);


