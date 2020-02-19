const docData = {
  Name: 'Bob', SortOrder: 1, Cost: 0, Role: 'Hero', MinSize: 1, MaxSize: 10, Abilities: 'None', Gear: [], Units: [],
};
const documents = { docs: [{ id: '1111', data: () => docData }] };
const singleDoc = { data: () => docData };
const set = jest.fn();
const doc = jest.fn(() => ({
  set,
  get: jest.fn(() => Promise.resolve(singleDoc)),
  delete: jest.fn(),
}));
const collection = jest.fn(() => ({
  doc,
  get: jest.fn(() => Promise.resolve(documents)),
  add: jest.fn(),
  onSnapshot: jest.fn((success) => success(documents)),
}));
function firestore() { return { collection }; }

export default firestore;
