import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import spotifyApi from './spotify-api'

spotifyApi.token = "BQBHAzY0Cuvr4ep1fOcrGphIGECXMchojn6j8krAmNrM4reHQcUg9CwGDa5ITEQfnbjZQ87YFG6Nei0vYQ8t2ms4DkkCptRFdyX25iufZe4_JW1y-yDXXYM5BbdEdAZOXcy63_oQFCHLHtgq"

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
