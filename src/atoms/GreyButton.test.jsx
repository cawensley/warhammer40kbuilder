import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { findByTestAttr } from '../utilities/testutils';
import GreyButton from './GreyButton';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = () => shallow(<GreyButton />);

test('it should render', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'greyButton');
  expect(component.length).toBe(1);
});
