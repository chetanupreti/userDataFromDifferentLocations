var redis = require("redis");

const client = redis.createClient(6379)

client.on('error', (err) => {
    console.log("Error " + err)
});

let cacheData = [{
        login: 'chetanupreti',
        avatar_url: 'https://avatars2.githubusercontent.com/u/29591435?v=4',
        bio: null,
        public_repos: 19,
        public_gists: 0,
        followers: 0,
        following: 0,
        id: 29591435,

    },
    {
        login: 'amitsingh',
        node_id: 'MDQ6VXNlcjQ5NTE5NQ==',
        avatar_url: 'https://avatars2.githubusercontent.com/u/495195?v=4',
        bio: null,
        public_repos: 0,
        public_gists: 0,
        followers: 0,
        following: 0,
        id: 495195,
    }
]

function setUserDataFromCache(users) {
    console.log(users);
    client.setex('cacheData', 30, JSON.stringify(cacheData));
}

setUserDataFromCache([{
        "userName": "chetanupreti"
    },
    {
        "userName": "amitsingh"
    }
])

async function getUserDataFromCache() {
    let returnCacheData = new Promise((resolve, reject) => {
        client.get('cacheData', (err, userData) => {
            if (err) {
                reject(err);
            }
            if (userData) {
                let cacheData = JSON.parse(userData);
                resolve(cacheData);
            }
        })
    })
    return returnCacheData;
}

getUserDataFromCache();

module.exports = {
    setUserDataFromCache,
    getUserDataFromCache
}