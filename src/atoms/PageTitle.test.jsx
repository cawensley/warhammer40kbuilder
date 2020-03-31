import React from 'react';
import { findByTestAttr, shallow, checkProp } from '../utilities/setupTests';
import PageTitle from './PageTitle';

const setup = (Title) => shallow(<PageTitle Title={Title} />);

test('it should render', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-Title');

  expect(component.length).toBe(1);
});

test('renders exact Title as given props', () => {
  const wrapper = setup('Hello World');
  const message = findByTestAttr(wrapper, 'component-Title');

  expect(message.text()).toBe('Hello World');
});

test('does not throw warning with expected props', () => {
  const expectedProps = { Title: 'Hello Out There' };

  checkProp(PageTitle, expectedProps);
});
