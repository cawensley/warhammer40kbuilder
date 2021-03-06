import React from 'react';
import firebase from 'firebase/app';
import { mount, findByTestAttr, auth } from '../utilities/setupTests';
import ForgotPasswordPage from './ForgotPasswordPage';

firebase.auth = auth;

const mocksetUserInfo = jest.fn();
let mockuserInfo;

const setup = (email) => {
  mockuserInfo = { Email: email, Message: '' };
  mocksetUserInfo.mockClear();
  React.useState = jest.fn(() => [mockuserInfo, mocksetUserInfo]);
  return mount(<ForgotPasswordPage />);
};

test('it should render', () => {
  const wrapper = setup('');
  const component = findByTestAttr(wrapper, 'ForgotPasswordPage');

  expect(component.length).toBe(1);
});

test('ForgetPasswordPage handleEmailInput function works properly', () => {
  const wrapper = setup('');
  const inputEmailBox = findByTestAttr(wrapper, 'input-box').at(0);
  inputEmailBox.simulate('change', { target: { value: 'Donny@gmail.com' } });

  expect(mocksetUserInfo).toHaveBeenCalledWith({ ...mockuserInfo, Email: 'Donny@gmail.com' });
});

test('ForgetPasswordPage submit button click calls SendResetEmail function SUCCESSFULLY', () => {
  const wrapper = setup('bobby@gmail.com');
  const submitButton = findByTestAttr(wrapper, 'submitButton');
  submitButton.simulate('submit', { preventDefault() {} });

  expect(auth().sendPasswordResetEmail).toHaveBeenCalled();
});

test('ForgetPasswordPage submit button click calls SendResetEmail function FAILURE', () => {
  const wrapper = setup('bademailaddress@gmail.com');
  const submitButton = findByTestAttr(wrapper, 'submitButton');
  submitButton.simulate('submit', { preventDefault() {} });

  expect(auth().sendPasswordResetEmail).toHaveBeenCalled();
});
