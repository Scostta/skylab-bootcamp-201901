import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Scene, Entity } from 'aframe-react'
import './index.sass'

const { REACT_APP_API_URL } = process.env

class ArCompo extends Component {

    onClose = () => {
        var video = document.getElementsByTagName('video')[0]
        // this.stopStreamVideo(video)
        video.parentNode.removeChild(video)

        var body = document.getElementsByTagName('body')[0]
        body.removeAttribute("style")
        window.location.reload()
        this.props.history.replace('/')
    }

    componentDidMount() {

        // var el = document.getElementsByTagName('a-entity')[0]

        // el.object3D.scale.set({x: 0.01, y: 0.01, z: 0.01})

        // console.log(el.object3D)
    }

    // stopStreamVideo = videoElem => {
    //     let stream = videoElem.srcObject
    //     let tracks = stream.getTracks()

    //     tracks.forEach(track => track.stop())

    //     videoElem.srcObject = null
    // }

    render() {
        // mas o menos correcto, tocando posicion y sin UI
        // return <section className="ar">
        //     <button className="ar__btn" onClick={() => this.onClose()}>
        //     close ar 
        //     </button>
        //     <Scene embedded arjs={{ sourceType: 'webcam', debugUIEnabled: 'false', detectionMode: 'mono', maxDetectionRate: 30, canvasWidth: 240, canvasHeight: 180 }}>
        //         <a-marker preset="hiro">
        //             {/* <a-gltf-model src={`models/seat/scene.gltf`} scale="1 1 1"></a-gltf-model> */}
        //             <a-entity obj-model={`obj: url(${REACT_APP_API_URL}/object3d/${this.props.productId}.obj)`} position="0 0 0" rotation="-90 180 180" scale="0.0009 0.0009 0.0009"></a-entity>
        //             {/* <Entity geometry={{ primitive: 'box', width: '1', height: '1' }}
        //                 position={{ x: 0, y: 0, z: -1 }} /> */}
        //         </a-marker>
        //         <Entity camera/>
        //     </Scene>
        // </section>

        // return <section className="ar">
        //     <button className="ar__btn" onClick={() => this.onClose()}>
        //     close ar 
        //     </button>
        //     <Scene embedded arjs={{ sourceType: 'webcam', debugUIEnabled: 'false', detectionMode: 'mono', maxDetectionRate: 30, canvasWidth: 240, canvasHeight: 180 }}>
        //         <a-marker preset="hiro">
        //             {/* <a-gltf-model src={`models/seat/scene.gltf`} scale="1 1 1"></a-gltf-model> */}
        //             <a-entity obj-model={`obj: url(${REACT_APP_API_URL}/object3d/${this.props.productId}.obj)`} position="0 0 0" rotation="-90 180 180" scale="0.1 0.1 0.1"></a-entity>
        //             {/* <Entity geometry={{ primitive: 'box', width: '1', height: '1' }}
        //                 position={{ x: 0, y: 0, z: -1 }} /> */}
        //         </a-marker>
        //         <Entity camera/>
        //     </Scene>
        // </section>

        // ${REACT_APP_API_URL}/object3d/${this.props.productId}.obj

        return <section className="ar">
            <button className="ar__btn" onClick={() => this.onClose()}>
            Close
            </button>
            <a-scene embedded artoolkit='sourceType: webcam'>
                <a-entity obj-model={`obj: url(models/avion.obj)`} position="0 0 0" rotation="-90 180 180" scale="0.1 0.1 0.1"></a-entity>
                <a-marker-camera preset='hiro'></a-marker-camera>
            </a-scene>
        </section>

        // return <section>
        //     <a-scene stats embedded arjs='sourceType: webcam; detectionMode: mono; maxDetectionRate: 30; canvasWidth: 240; canvasHeight: 180'>
        //         <a-box position='0 0.5 0' material='opacity: 0.5; side: double'>
        //         </a-box>
        //         <a-marker-camera preset='hiro'></a-marker-camera>
        //     </a-scene>
        // </section>


        // mas o menos bien pero se mueve mucho
        // return <section className="ar">
        //     <a-scene artoolkit={{ sourceType: 'webcam', trackingMethod: 'best'}}>
        //         <a-marker-camera preset="hiro">
        //             <Entity geometry={{ primitive: 'box', width: '1', height: '1' }} />
        //             <a-gltf-model src={`models/seat1/scene.gltf`} scale="0.01 0.01 0.01"></a-gltf-model>
        //         </a-marker-camera>
        //         <a-marker-camera/>
        //     </a-scene>
        // </section>

        //bastante bien
        // return <section className="ar">
        //     <a-scene embedded artoolkit={{ sourceType: 'webcam', trackingMethod: 'best' }}>
        //         <div>
        //             <button className="ar__btn">BACK</button>
        //         </div>
        //         <a-marker preset="hiro">
        //             <a-gltf-model src={`models/seat1/scene.gltf`} scale="0.01 0.01 0.01"></a-gltf-model>
        //             <Entity geometry={{ primitive: 'box', width: '1', height: '1' }} />
        //         </a-marker>
        //         <a-camera-static />
        //     </a-scene>
        // </section >

    }
}

export default withRouter(ArCompo)