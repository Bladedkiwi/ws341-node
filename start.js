require('dotenv').config({path:'variables.env'});
const express = require('express');
const app = express();
const professionalRoute = require('./Routes/professional');
const {connectToDatabase} = require("./db/connect");

/*******STARTING/SETTING UP APP CONNECTIONS*******/

//Parse Incoming Requests, Set Headers, Set Route
app.use(express.json())
    .use((req,res,next)=>{
        res.append('Access-Control-Allow-Origin', ['*']);
        res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.append('Access-Control-Allow-Headers', 'Content-Type');
        next();
    })
    .use('/professional', professionalRoute);

//Start server on port 8080
//Establish a connection with mongoDB so requests can be handled
app.listen(process.env.PORT, async () => {
    console.log(`Server running on port ${process.env.PORT}`);
    await connectToDatabase();
});
