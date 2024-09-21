require('dotenv').config({path:'variables.env'});
const MongoClient = require('mongodb').MongoClient;

let _db;

//Connecting to the DB first so that it's ready to go.
//Establishing the connection with MONGO DB
async function connectToDatabase() {
    const client = new MongoClient(process.env.DATABASE_URL);
    //Trying the connection
    try {
        await client.connect();
        console.log("Connected to MongoDB");

        // Storing USERS DB
        _db = client.db('users');

    } catch (err) {
        console.error("Failed to connect to MongoDB: ", err);
        throw err;
    }
}

const getDb = () => {
    if (!_db) {
        throw new Error('Database not connected.');
    }
    return _db; // Return the db instance
}



module.exports = {connectToDatabase , getDb};