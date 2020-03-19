const docData = {
  Name: 'Bob',
  Points: 0,
  Date: { Day: 2, Month: 2, Year: 2 },
  SquadArray: [{
    Role: { id: '1111', Name: 'HQ', SortOrder: 0 },
    Squads: [{
      Squad: 'TigerSquad', UnitQTY: 1, Unit: 'TigerLeader', Equipment: '44444',
    }],
  }],
  SortOrder: 1,
  Cost: 0,
  Role: 'Hero',
  MinSize: 1,
  MaxSize: 10,
  Abilities: 'None',
  Gear: [],
  Units: [],
};
const documents = { docs: [{ id: '1111', data: () => docData }] };
const onSnapshot = jest.fn((success) => success(documents));
const set = jest.fn();
const add = jest.fn();
const where = jest.fn(() => ({ onSnapshot }));
const getDoc = jest.fn(() => Promise.resolve({ data: () => docData }));
const getColl = jest.fn(() => Promise.resolve(documents));
const orderBy = jest.fn(() => ({ get: getColl }));
const limit = jest.fn(() => ({ orderBy }));
const doc = jest.fn(() => ({
  set, get: getDoc, delete: jest.fn(), onSnapshot,
}));
const collection = jest.fn(() => ({
  where, doc, limit, get: getColl, add, onSnapshot,
}));

function firestore() { return { collection }; }

export default firestore;
