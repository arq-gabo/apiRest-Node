const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

let placeShema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    acceptsCreditCard: {
        type: Boolean,
        default: false
    },
     coverImage: String,
     avatarImage: String,
     openHour: Number,
     closeHour: Number
});

placeShema.plugin(mongoosePaginate);

let Place = mongoose.model('Place', placeShema);

module.exports = Place;