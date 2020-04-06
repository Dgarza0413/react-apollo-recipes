import React, { useState } from 'react'

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

    return (
        <div className="App">
            <h2>Signup</h2>
            <form className="form">
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
        </div>
    )
}

export default Signup