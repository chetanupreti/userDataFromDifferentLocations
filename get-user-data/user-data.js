var dataBase = require('./user-data-insert-and-get-from-db');
var gitHub = require('./user-data-from-github');
var cacheMemory = require('./user-data-from-cache.js');

async function getAllUsersDetails(users) {
    var allUsersDetails = [];
    let dataFromCache;
    dataFromCache = await cacheMemory.getUserDataFromCache();
    if ( dataFromCache ) {
    }
    let dataFromGitHub = await gitHub.getUsersDetailsFormGithub(users);
    if( dataFromGitHub ) {
        let affectedRows = await dataBase.insertUsersDataToDb(dataFromGitHub);

    }
    let dataFromDb = await dataBase.getUsersDataFromDb(users);
    if(dataFromDb) {

    }

}

module.exports = {
    getAllUsersDetails
}