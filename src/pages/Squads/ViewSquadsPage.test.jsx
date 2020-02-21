import React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import store from '../../Redux/store';
import { findByTestAttr } from '../../utilities/testutils';
import ViewSquadsPage from './ViewSquadsPage';
import CodexChange from '../../Redux/actions/CodexChange';
import SquadsChange from '../../Redux/actions/SquadsChange';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = () => mount(
  <Provider store={store}>
    <Router>
      <ViewSquadsPage />
    </Router>
  </Provider>,
);

const mockSquadsArray = [
  {
    id: '11', Codex: 'Ninjas', Role: 'troops', Name: 'SquadSneaky', Units: ['sneakyGuys'],
  },
  {
    id: '22', Codex: 'Pirates', Role: 'elites', Name: 'SquadSwash', Units: ['burglers'],
  },
];

test('it should render', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'ViewSquadsPage');
  expect(component.length).toBe(1);
});
test('View Squads Page renders data when Codex and SquadsArray are in redux', () => {
  store.dispatch(CodexChange('Ninjas'));
  store.dispatch(SquadsChange(mockSquadsArray));
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'squadsDisplay');
  expect(component.length).toBe(1);
});
