const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'bdklhsumpiieavket1xo-mysql.services.clever-cloud.com',
    user: 'ury3danob9dxu3v4',
    password: '0uKLLD0qgO0N2AvMQi7u',
    database: 'bdklhsumpiieavket1xo'
});

connection.connect((err) => {
    if (err) {
        console.log('error in connection establishment');
    }
    else {
        console.log('connection establish');
    }
});

function insertUsersDataToDb(data) {
    console.log('data',data);
}

function getUsersDataFromDb(users) {
    console.log(users);
}

module.exports = {
    insertUsersDataToDb,
    getUsersDataFromDb
}