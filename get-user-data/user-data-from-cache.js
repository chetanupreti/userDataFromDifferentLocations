var redis = require("redis");

const client = redis.createClient(6379)

client.on('error', (err) => {
    console.log("Error " + err)
});

/**
 * 
 * @param {*} cacheData | data for cache memory.
 * @description this function set data to cache memory.
 */

function setUserDataIntoCache(cacheData) {
    client.setex('cacheData', 60, JSON.stringify(cacheData));
}

/**
 *  @description | this function return cache data.
 */

async function getUserDataFromCache() {
    let returnCacheData = new Promise((resolve, reject) => {
        client.get('cacheData', (err, userData) => {
            if (err) {
                reject(err);
            } else if (userData) {
                let cacheData = JSON.parse(userData);
                resolve(cacheData);
            } else {
                resolve(null);
            }
        })
    })
    return returnCacheData;
}

module.exports = {
    setUserDataIntoCache,
    getUserDataFromCache
}