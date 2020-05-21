const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');
const bcrypt = require('bcrypt');

const createToken = (user, secret, expiresIn) => {
    const { username, email } = user;
    return jwt.sign({ username, email }, secret, { expiresIn })
}

module.exports = {

    Query: {
        getAllRecipes: async (root, args, { Recipe }) => {
            const allRecipes = await Recipe.find();
            return allRecipes;
        },
        getCurrentUser: async (root, args, { currentUser, User }) => {
            console.log(currentUser)
            console.log(User)
            if (!currentUser) {
                return null;
            }
            const user = await User.findOne({ username: currentUser.username })
                .populate({
                    path: 'favorites',
                    model: 'Recipe'
                })

            return user
        }
    },
    Mutation: {
        // take a (root, args, context) parameters
        // if you decide to place this in context then it must reflect to the server
        addRecipe: async (
            root,
            { name, description, category, instructions, username },
            { Recipe }) => {
            const newRecipe = await new Recipe({
                name,
                description,
                category,
                instructions,
                username
            }).save();
            return newRecipe;
        },

        signinUser: async (root, { username, password }, { User }) => {
            // signinUser: async (root, { username, password }) => {
            const user = await User.findOne({ username });
            if (!user) {
                throw new AuthenticationError('User not found');
            }
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                throw new AuthenticationError('Invalid Password');
            }
            return { token: createToken(user, process.env.SECRET, '1hr') };

        },

        signupUser: async (root, { username, email, password }, { User }) => {
            // signupUser: async (root, { username, email, password }) => {
            const user = await User.findOne({ username })
            if (user) {
                // throw new Error('User already exists')
                throw new AuthenticationError('User already exists')
            }
            const newUser = await new User({
                username,
                email,
                password
            }).save();
            return { token: createToken(newUser, process.env.SECRET, '1hr') };
        }


    }
}