require('dotenv').config({ path: 'variables.env' });
const fs = require('fs');
const path = require('path');
const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors')

const PORT = process.env.PORT || 4444;

const { ApolloServer } = require('apollo-server-express');
const filePath = path.join(__dirname, "typeDefs.gql");
const typeDefs = fs.readFileSync(filePath, 'utf-8');
const resolvers = require('./resolvers');

const Recipe = require('./models/Recipe');
const User = require("./models/User");

const connectDb = require('./utils/connectDb');

const app = express();
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: { Recipe, User }
})

connectDb();

// Initalizes application
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}

server.applyMiddleware({ app, cors: corsOptions });

app.listen({ port: PORT }, () => {
    console.log(`server listening on ${server.graphqlPath} ${PORT}`)
});