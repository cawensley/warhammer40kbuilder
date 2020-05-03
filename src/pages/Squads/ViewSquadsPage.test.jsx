import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import store from '../../Redux/store';
import { mount, findByTestAttr } from '../../utilities/setupTests';
import ViewSquadsPage from './ViewSquadsPage';
import { CodexChange, SquadsChange, UserChange } from '../../Redux/actions/index';
import { mockUser } from '../../utilities/mockConstants';

const setup = () => {
  store.dispatch(UserChange(mockUser));
  return mount(
    <Provider store={store}>
      <Router>
        <ViewSquadsPage />
      </Router>
    </Provider>,
  );
};

const mockSquadsArray = [
  {
    id: '11', Codex: 'Ninjas', Role: 'troops', Name: 'SquadSneaky', Units: ['sneakyGuys'], userID: '2222',
  },
  {
    id: '12', Codex: 'Ninjas', Role: 'troops', Name: 'SquadSneaky', Units: ['sneakyGuys'], userID: '4444',
  },
  {
    id: '22', Codex: 'Pirates', Role: 'elites', Name: 'SquadSwash', Units: ['burglers'], userID: '3333',
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

  expect(component.length).toBe(2);
});
