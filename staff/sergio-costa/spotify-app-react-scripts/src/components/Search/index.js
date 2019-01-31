import React, {Component} from 'react'
import './index.sass'

class Search extends Component {

    state = { query: '' }

    handleSearchInput = event => this.setState({ query: event.target.value })

    handleFormSubmit = event => {
        event.preventDefault()

        const { state: { query }, props: { onSearch } } = this

        onSearch(query)
    }

    render() {

        const { handleSearchInput, handleFormSubmit} = this

        return <section className="header__search">
            <form onSubmit={handleFormSubmit}>
                <input className="search__bar" type="text" name="query" placeholder="search an artist..." onChange={handleSearchInput} />
                <button>Search</button>
            </form>
        </section>
    }
}

export default Search