import store from '../Redux/store';
import RolesChange from '../Redux/actions/RolesChange';
import handleSquadRowAdd from './handleSquadRowAdd';
import handleInitialArmy from './handleInitialArmy';

const mockRoles = [{ id: '11111', Name: 'HQ', SortOrder: 0 }];

test('Nothing is added with no squad available', () => {
  store.dispatch(RolesChange(mockRoles));
  handleInitialArmy();
  handleSquadRowAdd(0);
  expect(store.getState().army.SquadArray[0].Squads.length).toBe(0);
});
