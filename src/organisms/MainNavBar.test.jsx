import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import firebase from 'firebase/app';
import { mount, findByTestAttr, auth } from '../utilities/setupTests';
import MainNavBar from './MainNavBar';
import store from '../Redux/store';
import UserChange from '../Redux/actions/UserChange/UserChange';
import { mockUser } from '../utilities/mockConstants';

firebase.auth = auth;
const mockSetState = jest.fn();
store.dispatch(UserChange(mockUser));

const setup = (leftMenu, rightMenu) => {
  mockSetState.mockClear();
  React.useState = jest.fn(() => [{ leftMenu, rightMenu }, mockSetState]);
  return mount(
    <Provider store={store}>
      <Router>
        <MainNavBar />
      </Router>
    </Provider>,
  );
};

test('it should render', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'MainNavBar');

  expect(component.length).toBe(1);
});

test('Left Dropdown button click invokes SetState function', () => {
  const wrapper = setup('', '');
  const dropdownButton = findByTestAttr(wrapper, 'leftdropdownButton');
  dropdownButton.simulate('click', { preventDefault() {} });

  expect(mockSetState).toHaveBeenCalledWith({ leftMenu: 'show', rightMenu: '' });
});

test('Left Dropdown menu click invokes SetState function to remove "show"', () => {
  const wrapper = setup('show', '');
  const dropdownMenu = findByTestAttr(wrapper, 'leftdropdownMenu');
  dropdownMenu.simulate('click', { preventDefault() {} });

  expect(mockSetState).toHaveBeenCalledWith({ leftMenu: '', rightMenu: '' });
});

test('Left Dropdown menu click invokes SetState function to remove "show"', () => {
  const wrapper = setup('show', '');
  const dropdownMenu = findByTestAttr(wrapper, 'leftdropdownMenu');
  dropdownMenu.simulate('keydown', { keyCode: 13 });

  expect(mockSetState).toHaveBeenCalledWith({ leftMenu: '', rightMenu: '' });
});

test('Right Dropdown button click invokes SetState function', () => {
  const wrapper = setup('', '');
  const dropdownButton = findByTestAttr(wrapper, 'rightdropdownButton');
  dropdownButton.simulate('click', { preventDefault() {} });

  expect(mockSetState).toHaveBeenCalledWith({ leftMenu: '', rightMenu: 'show' });
});

test('Right Dropdown menu click invokes SetState function to remove "show"', () => {
  const wrapper = setup('', 'show');
  const dropdownMenu = findByTestAttr(wrapper, 'rightdropdownMenu');
  dropdownMenu.simulate('click', { preventDefault() {} });

  expect(mockSetState).toHaveBeenCalledWith({ leftMenu: '', rightMenu: '' });
});

test('Right Dropdown menu click invokes SetState function to remove "show"', () => {
  const wrapper = setup('', 'show');
  const dropdownMenu = findByTestAttr(wrapper, 'rightdropdownMenu');
  dropdownMenu.simulate('keydown', { keyCode: 13 });

  expect(mockSetState).toHaveBeenCalledWith({ leftMenu: '', rightMenu: '' });
});

test('Click on Logout button calls SIGNOUT function', () => {
  const wrapper = setup('', '');
  const Button = findByTestAttr(wrapper, 'logoutButton');
  Button.simulate('click', { preventDefault() {} });

  expect(auth().signOut).toHaveBeenCalled();
});
