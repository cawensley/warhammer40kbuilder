import React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import firebase from 'firebase/app';
import { findByTestAttr } from './utilities/testutils';
import App from './App';
import store from './Redux/store';
import UserChange from './Redux/actions/UserChange';
import auth from './utilities/mockAuth';
import firestore from './utilities/mockFirestore';

firebase.firestore = firestore;
firebase.auth = auth;
Enzyme.configure({ adapter: new EnzymeAdapter() });

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
