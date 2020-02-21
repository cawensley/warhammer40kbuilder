import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import firebase from 'firebase/app';
import { Provider } from 'react-redux';
import App from './App';
import store from './Redux/store';
import firebaseConfig from './firebase/config';

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'),
);
