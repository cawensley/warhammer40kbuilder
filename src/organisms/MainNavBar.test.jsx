import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { findByTestAttr } from '../utilities/testutils';
import MainNavBar from './MainNavBar';
import store from '../Redux/store';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const mockSetState = jest.fn();

const setup = (leftMenu, rightMenu) => {
  mockSetState.mockClear();
  React.useState = jest.fn(() => [{ leftMenu, rightMenu }, mockSetState]);
  return shallow(<MainNavBar />);
};

test('MainNavBar renders without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'MainNavBar');
  expect(component.length).toBe(1);
});
test('Logout button click changes redux loginstatus to false', () => {
  const wrapper = setup();
  const Button = findByTestAttr(wrapper, 'logoutButton');
  Button.simulate('click', { preventDefault() {} });
  expect(store.getState().isLoggedIn).toBe(false);
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
