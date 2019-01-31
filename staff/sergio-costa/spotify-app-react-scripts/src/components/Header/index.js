import React, {Component} from 'react'
import Search from '../Search'
import User from '../User'
import './index.sass'

class Header extends Component {

    render(){
        const {props:{searchVisible, handleSearch, user, onLogout}} = this

        return <header className="header">
        <h1 className="header__text">Spotify App</h1>
        {searchVisible && <Search onSearch={handleSearch}/>}
        {user && <User username = {user.name} onLogout={onLogout}/>}
        </header>   
    }
}

export default Header