import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { findByTestAttr } from '../utilities/testutils';
import ViewProfilePage from './ViewProfilePage';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = () => shallow(<ViewProfilePage />);

test('View Profile Page renders without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'ViewProfilePage');
  expect(component.length).toBe(1);
});
