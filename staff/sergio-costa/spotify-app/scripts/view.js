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
        super($(`<section class="results">
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
        super($(`<section class="resultsAlbum">
        <div class="container__album">
        </div>
</section>`))

        this.__$list__ = this.$container.find('div')
    }
    set albums (albums){
        albums.forEach(({id, name, images}) =>{

            const image = images[0] ? images[0].url :  'https://developer.spotify.com/assets/branding-guidelines/icon3@2x.png'
            
            const $item =$(`<div data-id=${id} class="album">
            <img src=${image} class="album__image">
            <h4 class="album__title">${name}</h4>
            <button class="album__button"><strong>Go To Album</strong></button>
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
        super($(`<section class="resultTracks">
        <h2>Tracks</h2>
        <img  class="tracks__button" src="back.png">
        <ul class="track__list"></ul>
</section>`))

        this.__$list__ = this.$container.find('ul')

        this.__$btnBack__=this.$container.find('img')
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

    set onGoBack(callback) {
        this.__$btnBack__.click(callback)
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

class LoginPanel extends Panel {
    constructor() {
        super($(`<section class="login container">
         <h2 class="text-center mb-5">Login</h2>
         <form class="login__form" >
        <div class="row">
        <div class="col text-center">
         <label for="email">E-mail:</label>
         <input class="form-control" type="email" name="email" placeholder="email" required>
        </div>
        <div class="col text-center">
         <label for="password">Password:</label>
         <input class="form-control" type="password" name="password" placeholder="password" required>
        </div>
        </div>
        <div class="col text-center">
         <button type="submit" class="btn btn-primary mt-5">Login</button>
        </div>
         </form>
         </section>`));

        this.__$form__ = this.$container.find('form');

        this.__$emailInput__ = this.__$form__.find('input[type=email]');

        this.__$passwordInput__ = this.__$form__.find('input[type=password]');

        var $registerLink = $('<a href="#" class="login__register-link">Register</a>');
        this.$container.append($registerLink);
        this.__$registerLink__ = $registerLink;
    }

    set onLogin(callback) {
        this.__$form__.on('submit', event => {
            event.preventDefault();

            var email = this.__$emailInput__.val();
            var password = this.__$passwordInput__.val();

            callback(email, password);
        });
    }

    set error(message) {
        this.__errorPanel__.message = message;
        this.__errorPanel__.show();
    }

    clear() {
        this.__$emailInput__.val('');
        this.__$passwordInput__.val('');
    }

    set onGoToRegister(callback) {
        this.__$registerLink__.on('click', callback);
    }
    
}

class WelcomePanel extends Panel{
    constructor(){
        super($(`<section class="welcomePanel">
        <img class="welcomePanel__img" src="person.png">
        <p class="welcomePanel__text">Sergio Costa</p>
        <div class="dropdown">
    <img src="moreinfo.png" class="welcomePanel__imgInfo dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"">
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item" href="#">Logout</a>
  </div>
</div>
        
        </section>`))

        this.__$userText__ = this.$container.find('p')
        this.__$logoutbtn__ = this.$container.find('a')

    }


    set user(user){
        this.__$userText__.text(user.name)
    }

    set onLogout(callback){
        this.__$logoutbtn__.on('click', callback)
    }
    
}

class RegisterPanel extends Panel{
    constructor(){
        super($('<section class="register container">'
        +'<h2 class="text-center mb-5">Register</h2>'
        + '<form class="register__form">'
        +'<div class=row>'
        +'<div class="col mb-3">'   
        + '<label font-weight-bold for="name">Name:</label>'
        + '<input class="form-control" type="text" name="name" placeholder="name" required>'
        +'</div>'
        +'</div>'
        +'</div>'
        +'<div class=row>'
        +'<div class="col mb-3">'
        + '<label font-weight-bold for="surname">Surname:</label>'
        + '<input class="form-control" type="text" name="surname" placeholder="surname" required>'
        +'</div>'
        +'</div>'
        +'<div class=row>'
        +'<div class="col mb-3">'
        + '<label font-weight-bold for="email">E-mail:</label>'
        + '<input class="form-control" type="email" name="email" placeholder="email" required>'
        +'</div>'
        +'</div>'
        +'<div class=row>'
        +'<div class="col mb-3">'
        + '<label font-weight-bold for="password">Password:</label>'
        + '<input class="form-control" type="password" name="password" placeholder="password" required>'
        +'</div>'
        +'</div>'
        +'<div class=row>'
        +'<div class="col mb-3">'
        + '<label font-weight-bold for="password">Confirm Password:</label>'
        + '<input class="form-control" type="password" name="password-confirmation" placeholder="password" required>'
        +'</div>'
        +'</div>'
        +'<div class="col text-center">'
        + '<button type="submit" class="btn btn-primary">Register</button>'
        +'</div>'
        + '</form>'
        + '</section>'));

        this.__$form__ = this.$container.find('form');

        this.__$nameInput__ = this.__$form__.find('input[name=name]');

        this.__$surnameInput__ = this.__$form__.find('input[name=surname]');

        this.__$emailInput__ = this.__$form__.find('input[type=email]');

        this.__$passwordInput__ = this.__$form__.find('input[name=password]');

        this.__$passwordConfirmationInput__ = this.__$form__.find('input[name=password-confirmation]');

        this.__$loginLink__ = $('<a href="#" class="register__login-link">Login</a>');
        this.$container.append(this.__$loginLink__)
    }

 
    set onRegister(callback) {
        this.__$form__.on('submit', event => {
            event.preventDefault();

            var name = this.__$nameInput__.val();
            var surname = this.__$surnameInput__.val();
            var email = this.__$emailInput__.val();
            var password = this.__$passwordInput__.val();
            var passwordConfirmation = this.__$passwordConfirmationInput__.val();

            callback(name, surname, email, password, passwordConfirmation);
        });
    }

    clear() {
        this.__$nameInput__.val('');
        this.__$surnameInput__.val('');
        this.__$emailInput__.val('');
        this.__$passwordInput__.val('');
        this.__$passwordConfirmationInput__.val('');
    }

    set onGoToLogin(callback) {
        this.__$loginLink__.on('click', callback);
    }
}