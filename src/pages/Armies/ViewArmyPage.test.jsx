import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { findByTestAttr } from '../../utilities/testutils';
import ViewArmyPage from './ViewArmyPage';
import UserArmiesChange from '../../Redux/actions/UserArmiesChange';
import store from '../../Redux/store';
import handleInitialArmy from '../../utilities/handleInitialArmy';
import UserChange from '../../Redux/actions/UserChange';
import HomeArmiesChange from '../../Redux/actions/HomeArmiesChange';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = () => shallow(<ViewArmyPage match={{ params: { ID: '5555' } }} />);

const mockUserArmy1 = [{
  id: '5555',
  Name: 'coolArmy11',
  userID: 'coolguy99',
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
  userID: 'coolguy99',
  Name: 'coolArmy11',
  Date: { Day: 2, Month: 2, Year: 2222 },
  Points: 999,
  SquadArray: [{
    Role: { id: '11111', Name: 'HQ', SortOrder: 1 },
    Squads: [],
  }],
},
];
const mockUser = { uid: 'coolguy99' };
const mockUser2 = { uid: 'fakeguy99' };

test('doesnt render without data', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'ViewArmyPage');
  expect(component.length).toBe(0);
});

test('renders with good userArmy data', () => {
  handleInitialArmy();
  store.dispatch(UserArmiesChange(mockUserArmy1));
  store.dispatch(UserChange(mockUser));
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'ViewArmyPage');
  expect(component.length).toBe(1);
});

test('renders with alternate DIV with bad userArmy data', () => {
  handleInitialArmy();
  store.dispatch(UserArmiesChange(mockUserArmy2));
  store.dispatch(UserChange(mockUser));
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'ViewArmyPage');
  expect(component.length).toBe(1);
});

test('renders without userArmy data but with homeArmy data', () => {
  handleInitialArmy();
  store.dispatch(UserArmiesChange([]));
  store.dispatch(HomeArmiesChange(mockUserArmy1));
  store.dispatch(UserChange(mockUser2));
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'ViewArmyPage');
  expect(component.length).toBe(1);
});
