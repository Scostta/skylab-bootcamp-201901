import React, {Component} from 'react'
import './index.sass'

class Albums extends Component {

    onAlbumSelected = id => {

        const {props : {onAlbumSelect}} = this

        onAlbumSelect(id)
    }

    render(){
        const {props: {albumsList}, onAlbumSelected} = this
        
        return <section className="resultsAlbum">
            <div className="container__album">
                {albumsList.map(({id, name, images}) => {
                    return <div className="album" key={id}>
                        <img className="album__image" src={images[0] ? images[0].url : 'https://developer.spotify.com/assets/branding-guidelines/icon3@2x.png'} onClick={() => onAlbumSelected(id)}/>
                        <h4 className="album__title">{name}</h4>
                        <button className="album__button"><strong>Go To Album</strong></button>
                    </div>
                })}
            </div>
        </section>
    }
}

export default Albums