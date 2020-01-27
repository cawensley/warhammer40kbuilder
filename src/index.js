import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import GlobalState from "./firebase/GlobalState";

ReactDOM.render(<GlobalState><App /></GlobalState>, document.getElementById('root'));
