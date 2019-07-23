var dataBase = require('./user-data-insert-and-get-from-db');
var gitHub = require('./user-data-from-github');
var cacheMemory = require('./user-data-from-cache.js');

async function getAllUserDetails(users) {
    console.log(users);
    var allUsersDetails = [];
    var dataFromFunctions;
    data = await cacheMemory.getUserDataFromCache(users);
    if ( data ) {

    }
    data = await gitHub.getUserDetailsFormGithub(users);
    if( data ) {

    }
    data = await dataBase.getUsersDataFromDb(users);
    if(data) {

    }

}

module.exports = {
    getAllUserDetails
}