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
                res.map((user) => {
                    allUserDetails.push(user.data);
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
    return await axios.get(`https://api.github.com/users/${user.userName}`);
}


module.exports = {
    getUsersDetailsFormGithub
}