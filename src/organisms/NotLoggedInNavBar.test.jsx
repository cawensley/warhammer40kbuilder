import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { findByTestAttr } from '../utilities/testutils';
import NotLoggedInNavBar from './NotLoggedInNavBar';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const mockSetShow = jest.fn();

const setup = (mockShow) => {
  mockSetShow.mockClear();
  React.useState = jest.fn(() => [mockShow, mockSetShow]);
  return shallow(<NotLoggedInNavBar />);
};

test('it should render', () => {
  const wrapper = setup('');
  const component = findByTestAttr(wrapper, 'NotLoggedInNavBar');
  expect(component.length).toBe(1);
});
test('Dropdown button click invokes SetShow function to add SHOW', () => {
  const wrapper = setup('');
  const dropdownButton = findByTestAttr(wrapper, 'dropdownButton');
  dropdownButton.simulate('click', { preventDefault() {} });
  expect(mockSetShow).toHaveBeenCalledWith('show');
});
test('Dropdown menu click invokes SetShow function to remove SHOW', () => {
  const wrapper = setup('show');
  const dropdownMenu = findByTestAttr(wrapper, 'dropdown');
  dropdownMenu.simulate('click', { preventDefault() {} });
  expect(mockSetShow).toHaveBeenCalledWith('');
});
test('Dropdown menu click invokes SetShow function to remove SHOW', () => {
  const wrapper = setup('show');
  const dropdownMenu = findByTestAttr(wrapper, 'dropdown');
  dropdownMenu.simulate('keydown', { keyCode: 13 });
  expect(mockSetShow).toHaveBeenCalledWith('');
});
