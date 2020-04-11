import React, { useState } from 'react'
import { Mutation } from 'react-apollo'
import { SIGNIN_USER } from '../../queries/index'
import Error from '../Utils/Error'

const Signin = () => {
    const [initialState] = useState({
        username: '',
        password: '',
    })

    const [signin, setSignin] = useState({
        ...initialState
    })

    const handleChange = (e) => {
        e.persist()
        setSignin(value => {
            return {
                ...value,
                [e.target.name]: e.target.value
            }
        })
    }

    const clearState = () => {
        setSignin({ ...initialState })
    }

    const handleSubmit = (e, signinUser) => {
        e.preventDefault();
        signinUser()
            .then(data => {
                console.log(data)
                clearState()
            })
            .catch(err => console.error(err))
    }

    const validateForm = () => {
        const { username, password } = signin
        const isInvalid = !username || !password
        return isInvalid
    }

    return (
        <div className="App">
            <h2>Signin</h2>
            <Mutation mutation={SIGNIN_USER} variables={
                { ...signin }
            }>
                {/* with the mutation tags you also get access to the function of the particular mutation function */}
                {(signinUser, { data, loading, error }) => {
                    return (
                        <form className="form" onSubmit={event => handleSubmit(event, signinUser)}>
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={signin.username}
                                onChange={handleChange}
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={signin.password}
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

export default Signin