import React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import firebase from 'firebase/app';
import { findByTestAttr } from '../utilities/testutils';
import LoginPage from './LoginPage';
import auth from '../utilities/mockAuth';

firebase.auth = auth;
Enzyme.configure({ adapter: new EnzymeAdapter() });

const mocksetUserInfo = jest.fn();
let mockuserInfo;

const setup = (password) => {
  mockuserInfo = { Email: '', Password: password, Error: '' };
  mocksetUserInfo.mockClear();
  React.useState = jest.fn(() => [mockuserInfo, mocksetUserInfo]);
  return mount(<LoginPage />);
};

test('Login Page renders without error', () => {
  const wrapper = setup('');
  const component = findByTestAttr(wrapper, 'LoginPage');
  expect(component.length).toBe(1);
});
test('Login Page handleEmailInput function works properly', () => {
  const wrapper = setup('');
  const inputEmailBox = findByTestAttr(wrapper, 'input-box').at(0);
  inputEmailBox.simulate('change', { target: { value: 'Benny@gmail.com' } });
  expect(mocksetUserInfo).toHaveBeenCalledWith({ ...mockuserInfo, Email: 'Benny@gmail.com' });
});
test('Login Page handlePasswordInput function works properly', () => {
  const wrapper = setup('');
  const inputPasswordBox = findByTestAttr(wrapper, 'input-box').at(1);
  inputPasswordBox.simulate('change', { target: { value: 'SecretPassword' } });
  expect(mocksetUserInfo).toHaveBeenCalledWith({ ...mockuserInfo, Password: 'SecretPassword' });
});
test('Login Page submit button click calls SIGNIN function and is a SUCCESS', () => {
  const wrapper = setup('success');
  const submitButton = findByTestAttr(wrapper, 'submitButton');
  submitButton.simulate('submit', { preventDefault() {} });
  expect(auth().signInWithEmailAndPassword).toHaveBeenCalled();
});
test('Login Page submit button click calls SIGNIN function and is a FAIL', () => {
  const wrapper = setup('wrongpassword');
  const submitButton = findByTestAttr(wrapper, 'submitButton');
  submitButton.simulate('submit', { preventDefault() {} });
  expect(auth().signInWithEmailAndPassword).toHaveBeenCalled();
});
