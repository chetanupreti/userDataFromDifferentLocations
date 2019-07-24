const axios = require('axios');

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

async function getUserData(user) {
    return await axios.get(`https://api.github.com/users/${user.userName}`);
}


module.exports = {
    getUsersDetailsFormGithub
}