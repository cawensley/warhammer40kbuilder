import codexFilter from './codexFilter';
import store from '../Redux/store';
import CodexChange from '../Redux/actions/CodexChange/CodexChange';

const mockArray = [
  { Codex: 'Pirates', Name: 'BlackBeard' },
  { Codex: 'Ninjas', Name: 'CoolNinja10' },
  { Codex: 'Worker', Name: 'BusyBee' },
];

test('codexFilter function properly filters desired codex info', () => {
  store.dispatch(CodexChange('Ninjas'));
  const mockDisplayResults = codexFilter(mockArray);

  expect(mockDisplayResults[0].Name).toEqual('CoolNinja10');
});
