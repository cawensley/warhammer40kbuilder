import React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import store from '../../Redux/store';
import { findByTestAttr } from '../../utilities/testutils';
import ViewUnitsPage from './ViewUnitsPage';
import CodexChange from '../../Redux/actions/CodexChange';
import UnitsChange from '../../Redux/actions/UnitsChange';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = () => mount(
  <Provider store={store}>
    <Router>
      <ViewUnitsPage />
    </Router>
  </Provider>,
);

const mockUnitsArray = [{
  id: '11', Codex: 'Ninjas', Name: 'UnitSneaky', Gear: ['sword'],
}, {
  id: '22', Codex: 'Pirates', Name: 'UnitBlack', Gear: ['pistol'],
}];

test('View Units Page renders without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'ViewUnitsPage');
  expect(component.length).toBe(1);
});
test('View Units Page renders data when Codex and UnitsArray are in redux', () => {
  store.dispatch(CodexChange('Pirates'));
  store.dispatch(UnitsChange(mockUnitsArray));
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'unitsDisplay');
  expect(component.length).toBe(1);
});
