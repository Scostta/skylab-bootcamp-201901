import React from 'react'

class Login extends React.Component {

    state = { email: '', password: '' }

    handleEmailInput = event => this.setState({ email: event.target.value })

    handlePasswrodInput = event => this.setState({ password: event.target.value })

    handleFormSubmit = event => {
        event.preventDefault()

        const { state: { email, password }, props: { onLogin } } = this

        onLogin(email, password)
    }

    hanldeGoToRegister = () => {

        const { props: { onGoToRegister } } = this

        onGoToRegister()
    }

    render() {

        const { hanldeGoToRegister, handleFormSubmit, handleEmailInput, handlePasswrodInput} = this

        return <section className="login container">
            <h2 className="text-center mb-5">Login</h2>
            <form className="login__form" onSubmit={handleFormSubmit}>
                <div className="row">
                    <div className="col text-center">
                        <label for="email">E-mail:</label>
                        <input className="form-control" type="email" name="email" placeholder="email" onChange={handleEmailInput} />
                    </div>
                    <div className="col text-center">
                        <label for="password">Password:</label>
                        <input className="form-control" type="password" name="password" placeholder="password" onChange={handlePasswrodInput} />
                    </div>
                </div>
                <div className="col text-center">
                    <button className="btn btn-primary mt-5">Login</button>
                </div>
            </form>
            <button className="btn btn-secondary" onClick={hanldeGoToRegister}>Go To Register</button>
        </section>
    }
}

export default Login