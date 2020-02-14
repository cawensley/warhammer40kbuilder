import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { findByTestAttr } from '../utilities/testutils';
import RegisterPage from './RegisterPage';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = () => shallow(<RegisterPage />);

test('Register Page renders without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'RegisterPage');
  expect(component.length).toBe(1);
});
