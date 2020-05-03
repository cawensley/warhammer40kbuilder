import { nameAscend, numberAscend } from './sortAscending';

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

test('numberAscend function sorts array by number ascending properly', () => {
  const mockDisplayResults = mockArray.sort(numberAscend);

  expect(mockDisplayResults[0].Name).toEqual('Donny');
});
