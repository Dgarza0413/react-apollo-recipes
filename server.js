const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
require('dotenv').config({ path: 'variables.env' });

const Recipe = require('./models/Recipe');
const User = require("./models/User");

//Bring in graphql express middleware
const { graphiqlExpress, graphqlExpress } = require('apollo-server-express')
const { makeExecutableSchema } = require('graphql-tools')

const { typeDefs } = require('./schema')
const { resolvers } = require('./resolvers')


const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/react-apollo-recipes";

// connects to database

mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
    .then(() => console.log("DB connected"))
    .catch(err => console.error(err))


// Initalizes application

const app = express();

// create graphiql application
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }

))

//connect schemas with graphql
app.use('/graphql', graphqlExpress({
    schema,
    context: {
        Recipe,
        User
    }
}))

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`)
})