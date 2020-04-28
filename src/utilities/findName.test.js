import store from '../Redux/store';
import { findRealRoleName, findRealSquadName } from './findName';
import { SquadsChange, RolesChange } from '../Redux/actions/index';
import { mockRoles, mockSquad } from './mockConstants';

test('FindRealSquadname successfully returns data', () => {
  store.dispatch(SquadsChange(mockSquad));
  const realName = findRealSquadName('TigerSquad');

  expect(realName).toBe('PirateSquad11');
});

test('FindRealRolename successfully returns data', () => {
  store.dispatch(RolesChange(mockRoles));
  const realName = findRealRoleName('22222');

  expect(realName).toBe('Elite');
});
