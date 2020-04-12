import React, { useState } from 'react'
import { Mutation } from 'react-apollo'
import { SIGNUP_USER } from '../../queries/index'
import Error from '../Utils/Error'

const Signup = () => {
    const [initialState] = useState({
        username: '',
        email: '',
        password: '',
        passwordConfirmation: ''
    })

    const [signup, setSignup] = useState({
        ...initialState
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

    const clearState = () => {
        setSignup({ ...initialState })
    }

    const handleSubmit = (e, signupUser) => {
        e.preventDefault();
        signupUser()
            .then(data => {
                console.log(data)
                localStorage.setItem('token', data.signupUser.token)
                clearState()
            })
            .catch(err => console.error(err))
    }

    const validateForm = () => {
        const { username, email, password, passwordConfirmation } = signup
        const isInvalid = !username || !email || !password || password !== passwordConfirmation
        return isInvalid
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
                                disabled={loading || validateForm()}
                                type="submit"
                                className="button-primary"
                            >Submit</button>
                            {error && <Error error={error.message} />}
                        </form>
                    )
                }}
            </Mutation>
        </div>
    )
}

export default Signup