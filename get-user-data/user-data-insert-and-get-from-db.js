const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'bdklhsumpiieavket1xo-mysql.services.clever-cloud.com',
    user: 'ury3danob9dxu3v4',
    password: '0uKLLD0qgO0N2AvMQi7u',
    database: 'bdklhsumpiieavket1xo'
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

connection.connect((err) => {
    if (err) {
        console.log('error in connection establishment');
    } else {
        console.log('connection establish');
    }
});

async function insertUsersDataToDb(dataFromGit) {
    var statement = `INSERT INTO fe_user_information (avatar_url,name,bio,public_repos,public_gists,followers,id)  VALUES ?`;
    var todos = [];
    dataFromGit.map( (user) => {
        let makeInsertData = [];
        makeInsertData.push(user.avatar_url);
        makeInsertData.push(user.login);
        makeInsertData.push(user.bio);
        makeInsertData.push(user.public_repos);
        makeInsertData.push(user.public_gists);
        makeInsertData.push(user.followers);
        makeInsertData.push(user.id);
        todos.push(makeInsertData);
    })
    connection.query(statement, [todos], (err, results) => {
        if (err) {
            return console.error(err.message);
        }
        if (results) {
            console.log('Row inserted:' + results.affectedRows);
        }
    });
}

insertUsersDataToDb(cacheData)

async function getUsersDataFromDb(users) {
}

module.exports = {
    insertUsersDataToDb,
    getUsersDataFromDb
}