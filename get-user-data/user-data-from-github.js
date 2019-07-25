const axios = require('axios');

/**
 * 
 * @param {*} users: username's for which hit github api ['chetan', 'amit', ........].
 * @description: this function get user's details and pushed into an array.
 */

async function getUsersDetailsFormGithub(users) {
    var allUserDetails = [];
    let returnData = new Promise((resolve, reject) => {
        var usersData = users.map((user) => getUserData(user))
        Promise.all(usersData)
            .then(res => {
                res.map( (user) => {
                    let makeInsertData = {};
                     makeInsertData['avatar_url'] = (user.data.avatar_url);
                     makeInsertData['name'] = (user.data.login);
                     makeInsertData['bio'] = (user.data.bio || ' ');
                     makeInsertData['public_repos'] = (user.data.public_repos);
                     makeInsertData['public_gists'] = (user.data.public_gists);
                     makeInsertData['followers'] = (user.data.followers);
                     makeInsertData['id'] = (user.data.id);
                    allUserDetails.push(makeInsertData);
                })
                resolve(allUserDetails);
            })
            .catch(error => {
                reject(error);
            })
    })
    return returnData;
}

/**
 * 
 * @param {*} user: username for which hit to github api.
 * @description: hit git api and return users's all details.
 */

async function getUserData(user) {
    return await axios.get(`https://api.github.com/users/${user.name}`);
}


module.exports = {
    getUsersDetailsFormGithub
}