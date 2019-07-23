const axios = require('axios');

function getUserDetailsFormGithub(users) {
    var allUserDetail = [];
    users.map(async (user) => {
        {
            let details;
            details = await axios.get(`https://api.github.com/users/${user}`);
            allUserDetail.push(details.data);
        }
        return allUserDetail;
    })
}

module.exports = {
    getUserDetailsFormGithub
}