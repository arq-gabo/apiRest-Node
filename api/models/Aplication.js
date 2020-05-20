const mongoose = require('mongoose');

let applicationSchema = new mongoose.Schema({
    applicationId: {
        type: String,
        required: true,
        unique: true
    },
    secret: {
        type: String,
        required: true,
        unique: true
    },
    origins: String,
    name: String
})

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;