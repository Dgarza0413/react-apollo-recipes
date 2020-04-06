const mongoose = require('mongoose');
const connection = {};
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/react-apollo-recipes"

const connectDb = async () => {

    // use new db connection
    if (connection.isConnected) {
        //use exisiting database connection
        return;
    }
    const db = await mongoose.connect(MONGODB_URI, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    console.log("db is connected")
    connection.isConnected = db.connections[0].readyState;
}

module.exports = connectDb;