import React, {Component} from 'react'
import './index.sass'

class Register extends Component {

    state = { name: '', surname: '', email: '', password: '', passwordConfirm: '' }

    handleInput = event => this.setState({ [event.target.name]: event.target.value })

    handleFormSubmit = event => {

        event.preventDefault()

        const { state: { name, surname, email, password, passwordConfirm }, props: { onRegister } } = this

        onRegister(name, surname, email, password, passwordConfirm)
    }

    handleGoToLogin = () => {

        const { props: { onGoToLogin } } = this

        onGoToLogin()
    }


    render() {

        const { handleGoToLogin, handleInput, handleFormSubmit} = this

        return <section className="register container">
            <h2 className="text-center mb-5">Register</h2>
            <form className="register__form" onSubmit={handleFormSubmit}>
                <div className="row">
                    <div className="col mb-3">
                        <label font-weight-bold for="name">Name:</label>
                        <input className="form-control" type="text" name="name" placeholder="name" onChange={handleInput} />
                    </div>
                </div>
                <div className="row">
                    <div className="col mb-3">
                        <label font-weight-bold for="surname">Surname:</label>
                        <input className="form-control" type="text" name="surname" placeholder="surname" onChange={handleInput} />        
                    </div>
                </div>
                <div className="row">
                    <div className="col mb-3">
                        <label font-weight-bold for="email">E-mail:</label>
                        <input className="form-control" type="email" name="email" placeholder="email" onChange={handleInput} />
                    </div>
                </div>
                <div className="row">
                    <div className="col mb-3">
                        <label font-weight-bold for="password">Password:</label>
                        <input className="form-control" type="password" name="password" placeholder="password" onChange={handleInput} />
                    </div>
                </div>
                <div className="row">
                    <div className="col mb-3">
                        <label font-weight-bold for="password">Confirm Password:</label>
                        <input className="form-control" type="password" name="passwordConfirm" placeholder="passwordConfirm" onChange={handleInput} />             
                    </div>
                </div>
                <div className="col text-center">
                    <button className="btn btn-primary mt-3">Register</button>
                </div>
            </form>
            <button className="btn btn-secondary" onClick={handleGoToLogin}>Go To Login</button>
        </section>
    }
}

export default Register