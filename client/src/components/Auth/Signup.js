import React, { useState } from 'react'
import { Mutation } from 'react-apollo'
import { SIGNUP_USER } from '../../queries/index'

const Signup = () => {
    const [signup, setSignup] = useState({
        username: '',
        email: '',
        password: '',
        passwordConfirmation: ''
    })

    const handleChange = (e) => {
        e.persist()
        setSignup(value => {
            return {
                ...value,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleSubmit = (e, signupUser) => {
        e.preventDefault();
        signupUser().then(data => {
            console.log(data)
        })

    }

    return (
        <div className="App">
            <h2>Signup</h2>
            <Mutation mutation={SIGNUP_USER} variables={
                { ...signup }
            }>
                {/* with the mutation tags you also get access to the function of the particular mutation function */}
                {(signupUser, { data, loading, error }) => {
                    return (
                        <form className="form" onSubmit={event => handleSubmit(event, signupUser)}>
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={signup.username}
                                onChange={handleChange}
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={signup.email}
                                onChange={handleChange}
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={signup.password}
                                onChange={handleChange}
                            />
                            <input
                                type="password"
                                name="passwordConfirmation"
                                placeholder="Confirm Password"
                                value={signup.passwordConfirmation}
                                onChange={handleChange}
                            />
                            <button
                                type="submit"
                                className="button-primary"
                            >Submit</button>
                        </form>
                    )
                }}
            </Mutation>
        </div>
    )
}

export default Signup