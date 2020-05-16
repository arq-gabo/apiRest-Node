const mongoose = require('mongoose');

const dbName = 'places_facilito_api';

module.exports = {
    connect: () => mongoose.connect('mongodb://localhost/' + dbName),
    dbName, //ShortHand properties es igual dbName: dbName
    connection: () => {
        if(mongoose.connection){
            return mongoose.connection;
        } else {
            return this.connect();
        }
    }
}