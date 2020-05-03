const mockRoles = [{ id: '1111', Name: 'HQ', SortOrder: 0 }, { id: '22222', Name: 'Elite', SortOrder: 1 }];

const mockRole = [{ id: '1111', Name: 'HQ', SortOrder: 0 }];

const mockUser = { uid: '2222', displayName: 'BobbyJoe', Email: 'bobbyJoe@gmail.com' };

const mockWrongUser = { uid: '3333', displayName: 'FakeUser', Email: 'fakeguy@gmail.com' };

const mockCodex = 'zzzzzzz';

const mockSquad = [{
  id: 'TigerSquad', Codex: 'zzzzzzz', Name: 'PirateSquad11', Role: '1111', MinSize: 1, MaxSize: 5, Units: ['TigerLeader'],
}];

const mockSquad2 = [{
  id: 'TigerSquad', Codex: 'zzzzzzz', Name: 'PirateSquad11', Role: '1111', MinSize: 1, MaxSize: 5, Units: [],
}];

const mockUnit = [{
  id: 'TigerLeader', Cost: 10, Name: 'PirateSquad11', Abilities: 'jumping', Gear: ['33333', '44444'],
}];

const mockUnit2 = [{
  id: 'TigerLeader', Cost: 10, Name: 'PirateSquad11', Abilities: 'jumping', Gear: [],
}];

const mockEquipment = [{ id: '33333', Cost: 5, Name: 'mockSword' }, { id: '44444', Cost: 6, Name: 'mockGun' }];

const mockRowAdd = {
  roleIndex: 0,
  firstSquadID: 'TigerSquad',
  firstUnitQTY: 1,
  firstUnitID: 'TigerLeader',
  firstEquipID: '33333',
};

const mockUserArmy1 = [{
  id: '5555',
  Name: 'coolArmy11',
  userID: '2222',
  Date: { Day: 2, Month: 2, Year: 2222 },
  Points: 999,
  SquadArray: [
    {
      Role: { id: '11111', Name: 'HQ', SortOrder: 1 },
      Squads: [{
        Squad: '2222', UnitQTY: 1, Unit: 'Ninja', Equipment: 'star',
      }, {
        Squad: null, UnitQTY: null, Unit: null, Equipment: 'axe',
      },
      ],
    },
  ],
}];

const mockUserArmy2 = [{
  id: '5555',
  Name: 'coolArmy11',
  userID: '2222',
  Date: { Day: 2, Month: 2, Year: 2222 },
  Points: 999,
  SquadArray: [{
    Role: { id: '11111', Name: 'HQ', SortOrder: 1 },
    Squads: [],
  }],
},
];

export {
  mockRoles, mockUser, mockCodex, mockSquad, mockUserArmy1, mockUserArmy2,
  mockSquad2, mockUnit, mockUnit2, mockEquipment, mockRowAdd, mockRole, mockWrongUser,
};
