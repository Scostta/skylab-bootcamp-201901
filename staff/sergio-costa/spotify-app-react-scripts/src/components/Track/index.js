import React, {Component} from 'react'
import './index.sass'

class Track extends Component {


    handleFav = id =>{

        const{props: {onFav}} = this

        onFav(id)
    }

    render(){
        
        const{handleFav ,props:{track:{id, preview_url, name}, favState}}=this

        return <section className="uniqueTrack">
            <h5 className="uniqueTrack-text" key={id}>{name}</h5>
            <audio src={preview_url} controls autoPlay></audio>
            <i className={`${favState ? `far fa-heart red`: `far fa-heart`}`} onClick={()=>handleFav(id)}></i>
        </section>
    }
}

export default Track