import React, {Component} from 'react'
import './index.sass'

class Artists extends Component {

    onArtistSelected = id => {
        
        const { props: {onArtistSelect}} = this

        onArtistSelect(id)
    }

    render() {
        const { props: { artistList }, onArtistSelected } = this

        return <section className="results">
            <h3>Artists</h3>
            <div className="container__artist">
                {artistList.map(({ id, images, name }) => {
                return<div className="artist__each" key={id} id-data={id}  onClick={() => onArtistSelected(id)}>
                        <img className="artist__img bd-placeholder-img rounded-circle" width="100px" src={images[0] ? images[0].url : 'https://developer.spotify.com/assets/branding-guidelines/icon3@2x.png'} />
                        <h4 className="artist__name">{name}</h4>
                    </div>
                })}
            </div>
        </section>
    }
}

export default Artists