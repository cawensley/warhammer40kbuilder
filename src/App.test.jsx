import React from 'react';
import { Provider } from 'react-redux';
import firebase from 'firebase/app';
import {
  mount, findByTestAttr, firestore, auth,
} from './utilities/setupTests';
import App from './App';
import store from './Redux/store';
import UserChange from './Redux/actions/UserChange/UserChange';

firebase.firestore = firestore;
firebase.auth = auth;

const setup = () => mount(
  <Provider store={store}>
    <App />
  </Provider>,
);

const mockUser = { uid: '2222', Name: 'success', Email: 'Jimbob@gmail.com' };

test('App renders when user is LoggedIN', () => {
  store.dispatch(UserChange(mockUser));
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'APPLoggedIn');

  expect(component.length).toBe(1);
});

test('App renders when user is LoggedOut', () => {
  store.dispatch(UserChange(null));
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'APPLoggedOut');

  expect(component.length).toBe(1);
});
