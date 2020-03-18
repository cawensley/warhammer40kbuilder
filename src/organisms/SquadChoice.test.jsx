import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { findByTestAttr } from '../utilities/testutils';
import handleInitialArmy from '../utilities/handleInitialArmy';
import ArmySquadRowAdd from '../Redux/actions/ArmySquadRowAdd';
import store from '../Redux/store';
import RolesChange from '../Redux/actions/RolesChange';
import SquadsChange from '../Redux/actions/SquadsChange';
import SquadChoice from './SquadChoice';
import CodexChange from '../Redux/actions/CodexChange';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const mockSquad1 = [{
  id: 'TigerSquad', Name: 'PirateSquad11', Role: '111111', MinSize: 1, MaxSize: 5, Units: [],
}];
const mockSquad2 = [{
  id: 'TigerSquad', Name: 'PirateSquad11', Codex: 'zzzzzzz', Role: '111111', MinSize: 1, MaxSize: 5, Units: ['TigerUnit'],
}];
const mockRowAdd = {
  roleIndex: 0,
  firstSquadID: 'TigerSquad',
  firstUnitQTY: 1,
  firstUnitID: 'TigerUnit',
  firstEquipID: '33333',
};
const mockRoles = [{ id: '111111', Name: 'HQ', SortOrder: 0 }];
const mockCodex = 'zzzzzzz';

const setup = (rowIndex, roleIndex) => shallow(<SquadChoice
  roleIndex={roleIndex}
  rowIndex={rowIndex}
/>);

beforeEach(() => {
  store.dispatch(RolesChange(mockRoles));
  store.dispatch(CodexChange(mockCodex));
  handleInitialArmy();
  store.dispatch(ArmySquadRowAdd(mockRowAdd));
});
test('it should render', () => {
  store.dispatch(SquadsChange(mockSquad1));
  const wrapper = setup(0, 0);
  const component = findByTestAttr(wrapper, 'selectInput');
  expect(component.length).toBe(1);
});
test('Squad options changes state of redux on change', () => {
  store.dispatch(SquadsChange(mockSquad2));
  const wrapper = setup(0, 0);
  const selectInput = findByTestAttr(wrapper, 'selectInput');
  selectInput.simulate('change', { target: { value: 'TheShinySquad' } });
  expect(store.getState().army.SquadArray[0].Squads[0].Squad).toBe('TheShinySquad');
});
