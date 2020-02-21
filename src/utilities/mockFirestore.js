const docData = {
  Name: 'Bob', SortOrder: 1, Cost: 0, Role: 'Hero', MinSize: 1, MaxSize: 10, Abilities: 'None', Gear: [], Units: [],
};
const documents = { docs: [{ id: '1111', data: () => docData }] };
const collection = jest.fn(() => ({
  doc: jest.fn(() => ({
    set: jest.fn(),
    get: jest.fn(() => Promise.resolve({ data: () => docData })),
    delete: jest.fn(),
  })),
  get: jest.fn(() => Promise.resolve(documents)),
  add: jest.fn(),
  onSnapshot: jest.fn((success) => success(documents)),
}));
function firestore() { return { collection }; }

export default firestore;
