import React, {Component} from 'react'
import './index.sass'

class User extends Component {

    handleLogoutButton = () => {
        const {props: {onLogout}} = this

        onLogout()
    }

    render(){
        const {props: {username}, handleLogoutButton} = this

        return <section className="welcomePanel">
        <img className="welcomePanel__img" src="images/person.png" />
        <p className="welcomePanel__text">{username}</p>
        <div className="dropdown">
            <img src="images/moreinfo.png" className="welcomePanel__imgInfo dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a className="dropdown-item" href="#" onClick ={handleLogoutButton}>Logout</a>
            </div>
        </div>
        </section>
    }
}

export default User