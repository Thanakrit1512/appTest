var mongojs = require('mongojs');

var databaseUrl = 'mongodb://localhost/db';
var collections = ['logger'];

var connect = mongojs(databaseUrl, collections);

module.exports = {
    connect: connect
};