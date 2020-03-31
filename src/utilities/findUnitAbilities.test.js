import store from '../Redux/store';
import findUnitAbilities from './findUnitAbilities';
import UnitsChange from '../Redux/actions/UnitsChange/UnitsChange';
import { mockUnit } from './mockConstants';

test('FindUnitAbilities successfully returns data', () => {
  store.dispatch(UnitsChange(mockUnit));
  const abilities = findUnitAbilities('TigerLeader');

  expect(abilities).toBe('jumping');
});
