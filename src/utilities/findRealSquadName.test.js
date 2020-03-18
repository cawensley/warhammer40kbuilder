import store from '../Redux/store';
import findRealSquadName from './findRealSquadName';
import SquadsChange from '../Redux/actions/SquadsChange';

const mockSquad = [{ id: '11111', Name: 'Jooora' }];

test('FindRealSquadname successfully returns data', () => {
  store.dispatch(SquadsChange(mockSquad));
  const realName = findRealSquadName('11111');
  expect(realName).toBe('Jooora');
});
