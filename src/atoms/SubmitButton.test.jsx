import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { findByTestAttr, checkProp } from '../utilities/testutils';
import SubmitButton from './SubmitButton';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = (buttontext) => shallow(<SubmitButton buttontext={buttontext} />);

test('it should render', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-button');
  expect(component.length).toBe(1);
});

test('renders button with proper text when given props', () => {
  const wrapper = setup('IamHuman');
  const component = findByTestAttr(wrapper, 'component-button');
  expect(component.text()).toBe('IamHuman');
});

test('does not throw warning with expected props', () => {
  const expectedProps = { buttontext: 'IamHuman' };
  checkProp(SubmitButton, expectedProps);
});
