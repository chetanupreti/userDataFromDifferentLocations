var dataBase = require('./user-data-insert-and-get-from-db');
var gitHub = require('./user-data-from-github');
var cacheMemory = require('./user-data-from-cache.js');

var returnAllUserData = [];

async function getAllUsersDetails(users) {
    let allUsersDetails = new Promise(async (resolve, reject) => {
        {
            let dataFromCache;
            dataFromCache = await cacheMemory.getUserDataFromCache();
            if (dataFromCache) {
                users = removeUsers(users);
            }
        }
        if (users && users.length > 0) {
            {
                let dataFromDb;
                dataFromDb = await dataBase.getUsersDataFromDb(users);
                console.log(dataFromDb);
                if ( dataFromDb && dataFromDb.length > 0) {
                    pushDataForReturn(JSON.stringify(dataFromDb));
                    users = removeUsers(users);
                    console.log( users );
                }
            }
        }
        if (users && users.length > 0) {
            {
                let dataFromGitHub;
                dataFromGitHub = await gitHub.getUsersDetailsFormGithub(users);
                console.log('data from github', dataFromGitHub);
                pushDataForReturn(JSON.stringify(dataFromGitHub));
                cacheMemory.setUserDataIntoCache(returnAllUserData);
                users = removeUsers(users);
                if (dataFromGitHub) {
                    let affectedRows = await dataBase.insertUsersDataToDb( dataFromGitHub );
                    console.log(affectedRows);
                }
            }
        }
        resolve(returnAllUserData);
    })
    return allUsersDetails;
}


function pushDataForReturn(pushedUserData) {
    pushedUserData = JSON.parse(pushedUserData);
    pushedUserData.map((user) => {
        returnAllUserData.push(user);
    })
}



function removeUsers(userName) {
    return userName.filter(user1 => !returnAllUserData.find(user2 => user1.name.toLowerCase() === user2.name.toLowerCase()));
}

module.exports = {
    getAllUsersDetails
}