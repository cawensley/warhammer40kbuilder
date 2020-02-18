import React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import firebase from 'firebase/app';
import { findByTestAttr } from '../utilities/testutils';
import ForgotPasswordPage from './ForgotPasswordPage';
import auth from '../utilities/mockAuth';

firebase.auth = auth;
Enzyme.configure({ adapter: new EnzymeAdapter() });

const mocksetUserInfo = jest.fn();
let mockuserInfo;

const setup = (email) => {
  mockuserInfo = { Email: email, Message: '' };
  mocksetUserInfo.mockClear();
  React.useState = jest.fn(() => [mockuserInfo, mocksetUserInfo]);
  return mount(<ForgotPasswordPage />);
};

test('ForgotPasswordPage renders without error', () => {
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
