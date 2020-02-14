import React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { findByTestAttr } from './utilities/testutils';
import App from './App';
import store from './Redux/store';
import LoginChange from './Redux/actions/LoginChange';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = () => mount(
  <Provider store={store}>
    <App />
  </Provider>,
);

test('App renders when user is LoggedIN', () => {
  store.dispatch(LoginChange(true));
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'APPLoggedIn');
  expect(component.length).toBe(1);
});
test('App renders when user is APPLoggedOut', () => {
  store.dispatch(LoginChange(false));
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'APPLoggedOut');
  expect(component.length).toBe(1);
});
