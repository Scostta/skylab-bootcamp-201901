import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import spotifyApi from './spotify-api-1.0.0'

spotifyApi.token = "BQDKXN5mc1w7nFjvNNcP5pb2-SLwTntTlW4VMpPQ6EyhaVhaECFk4FHEn49hNq5eoRdKAygbZpmgfA8zjP-0j7Gt_U1ghtCJE3jeNEPMolwR3Ddf-_bP3QXuKoRrGeMLTyotF5Um0R4UfBBV"

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
