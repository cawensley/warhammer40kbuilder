import store from '../Redux/store';
import { findRealSquadName } from './findName';
import SquadsChange from '../Redux/actions/SquadsChange/SquadsChange';
import { mockSquad } from './mockConstants';

test('FindRealSquadname successfully returns data', () => {
  store.dispatch(SquadsChange(mockSquad));
  const realName = findRealSquadName('TigerSquad');

  expect(realName).toBe('PirateSquad11');
});
