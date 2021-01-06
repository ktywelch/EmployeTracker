const mysql = require('mysql')

const connection = mysql.createConnection({ 
/* local
    host: 'localhost',  
    port: 3306,   
    user: 'root', 
    password: 'password', 
    database: 'company'})
    */
   host: 'jhdjjtqo9w5bzq2t.cbetxkdyhwsb.us-east-1.rds.amazonaws.com', 	
   user: 'sst2p0qlwrd0210a',
   password: 'gdj7czzb43p9zsm7', 	
   port: 3306, 	
   database: 'l10cpfobpycpbfk6'})


module.exports = connection; 