import store from '../Redux/store';
import findUnitAbilities from './findUnitAbilities';
import UnitsChange from '../Redux/actions/UnitsChange';

const mockUnit = [{ id: '11111', Name: 'Jooora', Abilities: 'ThrowingThings' }];

test('FindUnitAbilities successfully returns data', () => {
  store.dispatch(UnitsChange(mockUnit));
  const abilities = findUnitAbilities('11111');
  expect(abilities).toBe('ThrowingThings');
});
