import React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import firebase from 'firebase/app';
import { findByTestAttr } from '../utilities/testutils';
import RegisterPage from './RegisterPage';
import auth from '../utilities/mockAuth';

firebase.auth = auth;
Enzyme.configure({ adapter: new EnzymeAdapter() });

const mocksetUserInfo = jest.fn();
let mockuserInfo;

const setup = (name, password) => {
  mockuserInfo = {
    Name: name, Email: '', Password: password, Error: '',
  };
  mocksetUserInfo.mockClear();
  React.useState = jest.fn(() => [mockuserInfo, mocksetUserInfo]);
  return mount(<RegisterPage />);
};

test('it should render', () => {
  const wrapper = setup('', '');
  const component = findByTestAttr(wrapper, 'RegisterPage');
  expect(component.length).toBe(1);
});
test('Register Page handleNameInput function works properly', () => {
  const wrapper = setup('', '');
  const inputNameBox = findByTestAttr(wrapper, 'input-box').at(0);
  inputNameBox.simulate('change', { target: { value: 'Benny' } });
  expect(mocksetUserInfo).toHaveBeenCalledWith({ ...mockuserInfo, Name: 'Benny' });
});
test('Register Page handleEmailInput function works properly', () => {
  const wrapper = setup('', '');
  const inputEmailBox = findByTestAttr(wrapper, 'input-box').at(1);
  inputEmailBox.simulate('change', { target: { value: 'Benny@gmail.com' } });
  expect(mocksetUserInfo).toHaveBeenCalledWith({ ...mockuserInfo, Email: 'Benny@gmail.com' });
});
test('Register Page handlePasswordInput function works properly', () => {
  const wrapper = setup('', '');
  const inputPasswordBox = findByTestAttr(wrapper, 'input-box').at(2);
  inputPasswordBox.simulate('change', { target: { value: 'SecretPassword' } });
  expect(mocksetUserInfo).toHaveBeenCalledWith({ ...mockuserInfo, Password: 'SecretPassword' });
});
test('Register Page submit button click calls CreateNewUser function SUCCESSFULLY', () => {
  const wrapper = setup('success', 'success');
  const submitButton = findByTestAttr(wrapper, 'submitButton');
  submitButton.simulate('submit', { preventDefault() {} });
  expect(auth().createUserWithEmailAndPassword).toHaveBeenCalled();
});
test('Register Page submit button click calls CreateNewUser function FAILURE', () => {
  const wrapper = setup('', '');
  const submitButton = findByTestAttr(wrapper, 'submitButton');
  submitButton.simulate('submit', { preventDefault() {} });
  expect(auth().createUserWithEmailAndPassword).toHaveBeenCalled();
});
