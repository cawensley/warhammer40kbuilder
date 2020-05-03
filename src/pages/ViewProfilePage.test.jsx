import React from 'react';
import firebase from 'firebase/app';
import { Provider } from 'react-redux';
import { mount, findByTestAttr, auth } from '../utilities/setupTests';
import ViewProfilePage from './ViewProfilePage';
import store from '../Redux/store';
import UserChange from '../Redux/actions/UserChange/UserChange';

firebase.auth = auth;

let mockUser;
const mocksetUserInfo = jest.fn();

const setup = (name, email, password) => {
  mockUser = {
    uid: '1111', Name: name, Email: email, Password: password, Message: '',
  };
  store.dispatch(UserChange(mockUser));
  mocksetUserInfo.mockClear();
  React.useState = jest.fn(() => [mockUser, mocksetUserInfo]);
  return mount(
    <Provider store={store}>
      <ViewProfilePage />
    </Provider>,
  );
};

test('it should render', () => {
  const wrapper = setup('', '', '');
  const component = findByTestAttr(wrapper, 'ViewProfilePage');

  expect(component.length).toBe(1);
});

test('View Profile Page handleNameInput function works properly', () => {
  const wrapper = setup('', '', '');
  const inputNameBox = findByTestAttr(wrapper, 'input-box').at(0);
  inputNameBox.simulate('change', { target: { value: 'Benny' } });

  expect(mocksetUserInfo).toHaveBeenCalledWith({ ...mockUser, Name: 'Benny' });
});

test('View Profile Page handleEmailInput function works properly', () => {
  const wrapper = setup('', '', '');
  const inputEmailBox = findByTestAttr(wrapper, 'input-box').at(1);
  inputEmailBox.simulate('change', { target: { value: 'Benny@gmail.com' } });

  expect(mocksetUserInfo).toHaveBeenCalledWith({ ...mockUser, Email: 'Benny@gmail.com' });
});

test('View Profile Page handlePasswordInput function works properly', () => {
  const wrapper = setup('', '', '');
  const inputPasswordBox = findByTestAttr(wrapper, 'input-box').at(2);
  inputPasswordBox.simulate('change', { target: { value: 'SecretPassword' } });

  expect(mocksetUserInfo).toHaveBeenCalledWith({ ...mockUser, Password: 'SecretPassword' });
});

test('View Profile Page submit button click calls UpdateProfileName function SUCCESSFULLY', () => {
  const wrapper = setup('success', '', '');
  const submitButton = findByTestAttr(wrapper, 'submitName');
  submitButton.simulate('submit', { preventDefault() {} });

  expect(auth().currentUser.updateProfile).toHaveBeenCalled();
});

test('View Profile Page submit button click calls UpdateEmail function SUCCESSFULLY', () => {
  const wrapper = setup('', 'success', '');
  const submitButton = findByTestAttr(wrapper, 'submitEmail');
  submitButton.simulate('submit', { preventDefault() {} });

  expect(auth().currentUser.updateEmail).toHaveBeenCalled();
});

test('View Profile Page submit button click calls UpdatePassword function SUCCESSFULLY', () => {
  const wrapper = setup('', '', 'success');
  const submitButton = findByTestAttr(wrapper, 'submitPassword');
  submitButton.simulate('submit', { preventDefault() {} });

  expect(auth().currentUser.updatePassword).toHaveBeenCalled();
});

test('View Profile Page submit button click calls UpdateProfileName function FAILURE', () => {
  const wrapper = setup('', '', '');
  const submitButton = findByTestAttr(wrapper, 'submitName');
  submitButton.simulate('submit', { preventDefault() {} });

  expect(auth().currentUser.updateProfile).toHaveBeenCalled();
});

test('View Profile Page submit button click calls UpdateEmail function FAILURE', () => {
  const wrapper = setup('', '', '');
  const submitButton = findByTestAttr(wrapper, 'submitEmail');
  submitButton.simulate('submit', { preventDefault() {} });

  expect(auth().currentUser.updateEmail).toHaveBeenCalled();
});

test('View Profile Page submit button click calls UpdatePassword function FAILURE', () => {
  const wrapper = setup('', '', '');
  const submitButton = findByTestAttr(wrapper, 'submitPassword');
  submitButton.simulate('submit', { preventDefault() {} });

  expect(auth().currentUser.updatePassword).toHaveBeenCalled();
});
