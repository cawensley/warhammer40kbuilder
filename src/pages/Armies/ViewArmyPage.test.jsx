import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { findByTestAttr } from '../../utilities/testutils';
import ViewArmyPage from './ViewArmyPage';
import UserArmiesChange from '../../Redux/actions/UserArmiesChange';
import store from '../../Redux/store';
import handleInitialArmy from '../../utilities/handleInitialArmy';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = () => shallow(<ViewArmyPage match={{ params: { ID: '5555' } }} />);

const mockUserArmy1 = [{
  id: '5555',
  Name: 'coolArmy11',
  Date: { Day: 2, Month: 2, Year: 2222 },
  Points: 999,
  SquadArray: [
    {
      Role: { id: '11111', Name: 'HQ', SortOrder: 1 },
      Squads: [{
        Squad: '2222', UnitQTY: 1, Unit: 'Ninja', Equipment: 'star',
      }, {
        Squad: null, UnitQTY: null, Unit: null, Equipment: 'axe',
      },
      ],
    },
  ],
}];

const mockUserArmy2 = [{
  id: '5555',
  Name: 'coolArmy11',
  Date: { Day: 2, Month: 2, Year: 2222 },
  Points: 999,
  SquadArray: [{
    Role: { id: '11111', Name: 'HQ', SortOrder: 1 },
    Squads: [],
  }],
},
];

test('doesnt render without data', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'ViewArmyPage');
  expect(component.length).toBe(0);
});

test('renders with good userArmy data', () => {
  handleInitialArmy();
  store.dispatch(UserArmiesChange(mockUserArmy1));
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'ViewArmyPage');
  expect(component.length).toBe(1);
});

test('renders with alternate DIV with bad userArmy data', () => {
  handleInitialArmy();
  store.dispatch(UserArmiesChange(mockUserArmy2));
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'ViewArmyPage');
  expect(component.length).toBe(1);
});
