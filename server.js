require('dotenv').config({ path: 'variables.env' });
const fs = require('fs');
const path = require('path');
const express = require('express');
const jwt = require('jsonwebtoken')

const PORT = process.env.PORT || 4444;

const { ApolloServer } = require('apollo-server-express');
const filePath = path.join(__dirname, "typeDefs.gql");
const typeDefs = fs.readFileSync(filePath, 'utf-8');
const resolvers = require('./resolvers');

const Recipe = require('./models/Recipe');
const User = require("./models/User");

const connectDb = require('./utils/connectDb');

const app = express();

const getUser = async token => {
    if (token) {
        try {
            return await jwt.verify(token, process.env.SECRET);
        } catch (err) {
            throw new AuthenticationError(
                "Your session has ended. Please sign in again"
            );
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: { Recipe, User }
    // context: async ({ req }) => {
    //     const token = req.headers["authorization"];
    //     console.log(token)
    //     if (token) {
    //         return {
    //             Recipe,
    //             User,
    //             currentUser: await getUser(token)
    //         }
    //     } else {
    //         return console.log('no token')
    //     }
    // }
})

connectDb();

// set up jwt authentication middleware

// app.use(async (req, res, next) => {
// const token = await req.headers['authorization'] || '';
// console.log(token)
// if (token !== 'null') {
//     try {
//         // const currentUser = await jwt.verify(token, process.env.SECRET)
//         // req.currentUser = currentUser
//     } catch (error) {
//         console.error(error)
//     }
// }
// next();
// });

server.applyMiddleware({
    app, cors: {
        origin: 'http://localhost:3000',
        credentials: true
    }
});


app.listen({ port: PORT }, () => {
    console.log(`server listening on ${server.graphqlPath}  ${PORT}`)
});