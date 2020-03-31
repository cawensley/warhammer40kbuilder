import React from 'react';
import { shallow, findByTestAttr } from '../utilities/setupTests';
import handleInitialArmy from '../utilities/handleInitialArmy';
import store from '../Redux/store';
import {
  RolesChange, SquadsChange, CodexChange, ArmySquadRowAdd,
} from '../Redux/actions/index';
import SquadChoice from './SquadChoice';
import {
  mockSquad, mockRowAdd, mockRoles, mockCodex, mockSquad2,
} from '../utilities/mockConstants';

const setup = (rowIndex, roleIndex) => shallow(<SquadChoice
  roleIndex={roleIndex}
  rowIndex={rowIndex}
/>);

describe('testing SquadChoice.jsx with proper redux data loaded', () => {
  beforeEach(() => {
    store.dispatch(RolesChange(mockRoles));
    store.dispatch(CodexChange(mockCodex));
    handleInitialArmy();
    store.dispatch(ArmySquadRowAdd(mockRowAdd));
  });

  test('it should render', () => {
    store.dispatch(SquadsChange(mockSquad2));
    const wrapper = setup(0, 0);
    const component = findByTestAttr(wrapper, 'selectInput');

    expect(component.length).toBe(1);
  });

  test('Squad options changes state of redux on change', () => {
    store.dispatch(SquadsChange(mockSquad));
    const wrapper = setup(0, 0);
    const selectInput = findByTestAttr(wrapper, 'selectInput');
    selectInput.simulate('change', { target: { value: 'TheShinySquad' } });

    expect(store.getState().army.SquadArray[0].Squads[0].Squad).toBe('TheShinySquad');
  });
});
