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
        <input class="search__bar" type="text" name="query" placeholder="Search an artist...">
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

    clear(){
        this.__$query__.val('');
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

    clear(){
        this.__$list__.empty()
    }
}

class AlbumPanel extends Panel {
    constructor() {
        super($(`<section class="resultsAlbum container-fluid">
        <h3>Albums</h3>
        <div class="container__album">
        </div>
</section>`))

        this.__$list__ = this.$container.find('div')
    }
    set albums (albums){
        albums.forEach(({id, name, images}) =>{

            const image = images[0] ? images[0].url :  'https://developer.spotify.com/assets/branding-guidelines/icon3@2x.png'
            
            const $item =$(`<div data-id=${id} class="album">
            <img src=${image} class="album__image" width="400px">
            <h4 class="album__title">${name}</h4>
            <button class="album__button btn btn-primary">Go inside</button>
            </div>
            `)

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

    clear(){
        this.__$list__.empty()
    }

}

class TracksPanel extends Panel{
    constructor(){
        super($(`<section class="resultTracks container-fluid">
        <h2 class="resultTracks__title">Tracks</h2>
        <ul class="track__list"></ul>
</section>`))

        this.__$list__ = this.$container.find('ul')
    }

    set tracks(tracks){
        tracks.forEach(({id, track_number,name}) => {

            const $item = $(`<li class="track__item" data-id=${id}>${track_number} ${name}<img src="playbtn.png" width="40px" height="40px"></li>`)

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

    clear(){
        this.__$list__.empty()
    }
}

class UniqueTrackPanel extends Panel{
    constructor(){
        super($(`<section class="uniqueTrack">
        </section>`))

    }

    set uniqueTrack({id, name, preview_url}){

            const $item = $(`<h5  data-id = ${id} class="uniqueTrack-text">${name}</h5>
        <audio src=${preview_url} controls></audio>`)
    
            this.$container.append($item)
     }

    clear(){
        this.$container.empty()
    }
}