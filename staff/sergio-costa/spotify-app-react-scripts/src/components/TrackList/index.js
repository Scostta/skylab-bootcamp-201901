import React, {Component} from 'react'
import './index.sass'

class Tracks extends Component {

    handleGoBack = () => {
        const { props: {onGoBack}} = this

        onGoBack()
    }

    onTrackSelected = id => {
        const {props: {onTrackSelect}} = this

        onTrackSelect(id)
    }

    render(){

        const{props:{trackList}, onTrackSelected, handleGoBack} = this

        return <section className="resultTracks">
            <h2>Tracks</h2>
            <img className="tracks__button" src="images/back.png" onClick = {handleGoBack}/>
            <ul className="track__list">
                {trackList.map(({id, track_number, name}) => {
                    return <li className="track__item" key={id} data-id={id} onClick={()=>onTrackSelected(id)}>{track_number} {name}<img src="images/playbtn.png" width="40px" height="40px"/></li>
                })}
            </ul>
        </section>
    }
}

export default Tracks