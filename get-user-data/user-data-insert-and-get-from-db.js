const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'bdklhsumpiieavket1xo-mysql.services.clever-cloud.com',
    user: 'ury3danob9dxu3v4',
    password: '0uKLLD0qgO0N2AvMQi7u',
    database: 'bdklhsumpiieavket1xo'
});

connection.connect((err) => {
    if (err) {
        console.log('error in connection establishment', err);
    } else {
        console.log('connection establish');
    }
});


/*      
         -------------------------------------------------------------------------------------------------------------------------------------------------
         all function definations
*/


/**
 * 
 * @param {*} dataFromGit: users data from github api
 * @description: function insert data into databse
 */

async function insertUsersDataToDb(dataFromGit) {
    console.log(dataFromGit);
    var returnData = new Promise((resolve, reject) => {
        var statement = `INSERT INTO fe_user_information (avatar_url,name,bio,public_repos,public_gists,followers,id)  VALUES ?`;
        var todos = [];
        dataFromGit.map((user) => {
            let makeInsertData = [];
            makeInsertData.push(user.avatar_url);
            makeInsertData.push(user.name);
            makeInsertData.push(user.bio || ' ');
            makeInsertData.push(user.public_repos);
            makeInsertData.push(user.public_gists);
            makeInsertData.push(user.followers);
            makeInsertData.push(user.id);
            todos.push(makeInsertData);
        })
        connection.query(statement, [todos], (err, results) => {
            if (err) {
                reject(err);
            }
            if (results) {
                resolve(results.affectedRows);
            }
        });
    })
    return returnData;
}

/**
 * 
 * @param {*} users: users data that will retrieve into the database
 * @description: this function is used to retrieve users from database using In selector so data comes
 *               in one query.
 */

async function getUsersDataFromDb(users) {
    var returnData = new Promise((resolve, reject) => {
        var todos = [];
        users.map((user) => {
            todos.push(user.name);
        })
        {
            let inQueryString;
            inQueryString = makeStringForInSelector(todos);
            var statement = "select avatar_url,name,bio,public_repos,public_gists,followers,id from fe_user_information where name IN" + `(${inQueryString})`;
        }
        connection.query(statement, (err, results) => {
            if (err) {
                reject(err);
            }
            if (results) {
                resolve(results);
            }
        });
    })
    return returnData;
}

/***
 * @param {*} data: getting users data in this formate ["chetan","amit"]
 * @description this is used for making In selector data formate like ("chetan","amit")
 */

function makeStringForInSelector(data) {
    var returnStringForIn = '';
    for (let i = 0; i < data.length - 1; i++) {
        returnStringForIn = returnStringForIn + `"${data[i]}",`
    }
    returnStringForIn += `"${data[data.length-1]}"`;
    console.log(typeof returnStringForIn);
    return returnStringForIn;

}

module.exports = {
    insertUsersDataToDb,
    getUsersDataFromDb
}