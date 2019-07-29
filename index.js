const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var userData = require('./get-user-data/user-data')
const server = express();

server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var returnUserData;

server.post('/getUsersData', fetchUsersData);

server.get('', (request,response)=>{
    console.log('hye');
    response.send('hye');
})

/**
 * @param {*} request  | request object inserted by node when request is coming from browser. All
 *                       request details in this object.
 * @param {*} response | response object inserted by node. many method like end, send in response object.
 * @description        | this function send response (all user details ) to the front.
*/

async function fetchUsersData(request, response) {
    {
        let users;
        users = request.body.gitHubUserNames;
        console.log('users',users);
        await getUsersDetails(users);
    }
    response.send({usersDetails: returnUserData})
};


/**
 * 
 * @param {*} users | all users name from client side.
 * @description | this call user-data's getAllUsersDetails function that send all user details from
 *                github or db or cache.
 */

async function getUsersDetails( users ) {
    return new Promise(async (resolve, reject) => {
        let dataFromAllWay = await userData.getAllUsersDetails(users);
        console.log('data',dataFromAllWay);
        returnUserData = dataFromAllWay;
        resolve('resolved');
    })
}


server.use(bodyParser.json())
const port = process.env.PORT || 5000;
server.use(cors());
server.listen(port, () => {
    console.log(`server is started in ${port}`)
});