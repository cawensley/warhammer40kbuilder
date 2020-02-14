import nameAscend from './nameAscend';

const mockArray = [
  { Codex: 'Ninjas', Name: 'Donny', SortOrder: 2 },
  { Codex: 'Pirates', Name: 'BlackBeard', SortOrder: 3 },
  { Codex: 'Worker', Name: 'BusyBee', SortOrder: 3 },
  { Codex: 'Cops', Name: 'Donny', SortOrder: 1 },
  { Codex: 'Fireman', Name: 'Jake', SortOrder: 4 },
];

test('nameAscend function sorts array by name ascending properly', () => {
  const mockDisplayResults = mockArray.sort(nameAscend);
  expect(mockDisplayResults[0].Name).toEqual('BlackBeard');
});
