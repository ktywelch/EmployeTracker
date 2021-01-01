

const connection = "mysql.createConnection({ \
    connectionLimit : 10, \
    host: 'localhost',  \
    port: 3306,   \
    user: 'root', \
    password: 'password', \
    database: 'company'})"

module.exports = connection; 