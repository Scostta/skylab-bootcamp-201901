class Panel {
    constructor($container){
        this.$container = $container
    }

    show(){
        this.$container.show()
    }

    hide(){
        this.$container.hide()
    }
}

class SearchPanel extends Panel {
    constructor() {
        super($(`<section class="header__search">
    <form>
        <input type="text" name="query" placeholder="Search an artist...">
        <button type="submit">Search</button>
    </form>
</section>`))

    this.__$form__ = this.$container.find('form')
    this.__$query__= this.__$form__.find('input');
    }

    set onSearch(callback){
        this.__$form__.on('submit', event =>{
            event.preventDefault()

            const query = this.__$query__.val()

            callback(query)
        })
    } 
}

class ArtistsPanel extends Panel {
    constructor() {
        super($(`<section class="results container-flex">
    <h3>Artists</h3>
    <div class="container__artist">
    </div>
</section`))

        this.__$list__ = this.$container.find('div')
    }

    set artists(artists) {
        artists.forEach(({id, images, name}) => {
            const image = images[0] ? images[0].url :'https://developer.spotify.com/assets/branding-guidelines/icon3@2x.png'

            const $item = $(`<div data-id=${id} class="artist__each">
            <img src=${image} class="artist__img bd-placeholder-img rounded-circle" width="100px">
            <h4 class="artist__name">${name}</h4>
            </div>`)

            this.__$list__.append($item)

            $item.click(() =>{
                const id= $item.data('id')

                this.__onArtistSelected__(id)
            })
            this.__$list__.append($item)
        })
    }

    set onArtistSelected(callback){
        this.__onArtistSelected__=callback
    }
}

class AlbumPanel extends Panel {
    constructor() {
        super($(`<section class="resultsAlbum container-fluid">
        <h3>Albums</h3>
        <ul></ul>
</section>`))

        this.__$list__ = this.$container.find('ul')
    }
    set albums (albums){
        albums.forEach(({id, name, images}) =>{

            const image = images[0] ? images[0].url :  'https://developer.spotify.com/assets/branding-guidelines/icon3@2x.png'
            
            const $item =$(`<li data-id=${id}>${name}<img src=${image}></li>`)

            this.__$list__.append($item)

        
            $item.click(() => {
                const id= $item.data('id')

                this.__onAlbumSelected__(id)
            })
        })
    }

    set onAlbumSelected(callback){
        this.__onAlbumSelected__ = callback
    }

}

class TracksPanel extends Panel{
    constructor(){
        super($(`<section class="resultTracks container">
        <h3>Tracks</h3>
        <ul></ul>
</section>`))

        this.__$list__ = this.$container.find('ul')
    }

    set tracks(tracks){
        tracks.forEach(({id, name}) => {

            const $item = $(`<li data-id=${id}>${name}</li>`)

            this.__$list__.append($item)

            $item.click(() => {
                const id= $item.data('id')
    
                this.__onTrackSelected__(id)
            })
        })

    }

    set onTrackSelected(callback){
        this.__onTrackSelected__ = callback
    }
}

class UniqueTrackPanel extends Panel{
    constructor(){
        super($(`<section class="uniqueTrack container">
        <h3>Track</h3>
        </section>`))

    }

    set uniqueTrack({id, name, preview_url}){

            const $item = $(`<h5  data-id = ${id} class="card-text">${name}</h5>
        <audio src=${preview_url} controls> </audio>`)
    
            this.$container.append($item)
     }
}