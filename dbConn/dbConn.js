import sql from 'mysql';
import dbCnfg from '../config/dbConfig.js';

const dbConnection = sql.createPool({
    host: dbCnfg.host,
    user: dbCnfg.user,
    password: dbCnfg.password,
    localAddress: dbCnfg.localAddress,
    connectionLimit: dbCnfg.connectionLimit,
    database: dbCnfg.database
});

dbConnection.on('acquire', () => {
    console.log("connection acquired")
});
dbConnection.on('connection', function () {
    console.log("Successfully connected to the database.....");
});
dbConnection.on('release', () => {
    console.log("connection released")
});


export default dbConnection;