import React from 'react';
import { findByTestAttr, shallow } from '../utilities/setupTests';
import PageLoading from './PageLoading';

test('it should render', () => {
  const wrapper = shallow(<PageLoading />);
  const component = findByTestAttr(wrapper, 'loadingSpinCog');

  expect(component.length).toBe(1);
});
