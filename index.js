const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var userData = require('./get-user-data/user-data')
const server = express();
server.use(bodyParser.json())
const port = process.env.PORT || 5000;
server.use(cors());


server.post('/getUsersData', (req, res) => {
    {
        let users;
        users = req.body.gitHubUsers;
        userData.getAllUsersDetails(users);
    }
    res.send({yo:"yo"});
});

server.get('/', (req,res) => {
    res.send({hye:'hye'})
})

server.listen(port, function () {
    console.log(`server is started in ${port}`)
});