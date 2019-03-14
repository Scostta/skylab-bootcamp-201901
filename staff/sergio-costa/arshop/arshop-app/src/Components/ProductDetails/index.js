import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import logic from '../../logic'
import Feedback from '../Feedback'
import './index.sass'

class ProductDetails extends Component {

    state = { product: [], feedback: null, fav: false, userProduct: false }

    componentDidMount() {

        const { props: { productId } } = this

        this.handleShowProduct(productId)
        this.checkMyProducts()
        this.checkProductFav()
    }

    checkMyProducts = () => {
        try {
            if(logic.isUserLoggedIn){
                return logic.retrieveUserProducts()
                    .then(userProducts => {
                        const index = userProducts.findIndex(({id}) => id == this.props.productId)
                        if(index >=0) this.setState({userProduct: true})
                    })
                    .then(() => console.log(this.state.userProduct))
            }
        } catch (error) {

        }
    }

    checkProductFav = id => {
        try {
            if (logic.isUserLoggedIn) {
                logic.retrieveFavs()
                    .then(prodcutsOnFav => {
                        const index = prodcutsOnFav.findIndex(({id}) => id == this.props.productId)
                        if(index >=0) this.setState({fav: true})
                    })
            }
        } catch (error) {
            
        }
    }

    componentWillReceiveProps(props) {

        this.handleShowProduct(props.productId)
    }

    handleShowProduct = id => {
        id = this.props.productId

        try {
            logic.retrieveProduct(id)
                .then(product => this.setState({ product }))
                .catch(({ message }) => this.setState({ feedback: message }))
        } catch ({ message }) {
            this.setState({ feedback: message })
        }
    }

    onFav = id => {

        if (logic.isUserLoggedIn) {
            try {
                return logic.toogleFav(id)
                    .then(fav => this.setState({ fav: !fav }))
            } catch (error) {

            }
        } else {
            this.props.history.push('/login')
        }
    }

    render() {

        const { state: { product, feedback, fav } } = this

        return <section className="productDetails">
            <div className="productDetails__header">
                <div className="productDetails__icons">
                    <Link to="/">
                        <i className="fas fa-long-arrow-alt-left productDetails__icons--back"></i>
                    </Link>
                    {!this.state.userProduct && <i className={fav ? "fas fa-heart productDetails__icons--heart" : "far fa-heart productDetails__icons--heart"} onClick={() => this.onFav(product.id)}></i>}
                </div>
                <div className="productDetails__content">
                    <div className="productDetails__imgcontainer">
                        <img className="productDetails__img" src={product.imageUrl} />
                    </div>
                    <div className="productDetails__details">
                        <p className="productDetails__price">{product.price}</p>
                        <p className="productDetails__tittle">{product.tittle}</p>
                        <p className="productDetails__description">{product.description}</p>
                    </div>
                </div>
                <button className="productDetails__btn">Chat</button>
            </div>
            <Feedback message={feedback} />
        </section>
    }
}

export default withRouter(ProductDetails)