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
