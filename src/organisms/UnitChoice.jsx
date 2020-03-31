import React from 'react';
import PropTypes from 'prop-types';
import store from '../Redux/store';
import ArmyUnitChoice from '../Redux/actions/ArmyUnitChoice/ArmyUnitChoice';
import { findPreviousSquad } from '../utilities/findPrevious';
import { findRealUnitName } from '../utilities/findName';
import { handleUnitRowAdd } from '../utilities/handleRowAdd';
import GreyButton from '../atoms/GreyButton';
import { handleUnitRowRemove } from '../utilities/handleRowRemove';
import UnitQuantity from './UnitQuantity';

const UnitChoice = ({ roleIndex, rowIndex }) => {
  const choices = findPreviousSquad(roleIndex, rowIndex).Units;
  const currentChoice = store.getState().army.SquadArray[roleIndex].Squads[rowIndex].Unit;

  React.useEffect(() => {
    if (!choices.includes(currentChoice) && currentChoice !== null) {
      store.dispatch(ArmyUnitChoice({ roleIndex, rowIndex, UnitID: choices[0] }));
    }
  },
  [choices, rowIndex, roleIndex, currentChoice]);

  if (!currentChoice) {
    return <div className="col-5" />;
  }

  return (
    <div className="col-5">
      <div className="row">
        <UnitQuantity roleIndex={roleIndex} rowIndex={rowIndex} />
        <select
          data-test="selectInput"
          className="bg-white col-6"
          value={currentChoice}
          onChange={(event) => store.dispatch(ArmyUnitChoice(
            { roleIndex, rowIndex, UnitID: event.target.value },
          ))}
        >
          {choices.map((choice) => (
            <option key={choice} value={choice}>{findRealUnitName(choice)}</option>
          ))}
        </select>
        <button data-test="UnitRowAdd" className="col-2 bg-success border-primary" aria-label="AddUnit" type="button" onClick={() => handleUnitRowAdd(roleIndex, rowIndex)}><i className="fas fa-plus" /></button>
        {(store.getState().army.SquadArray[roleIndex].Squads[rowIndex].Squad)
          ? <GreyButton />
          : <button data-test="UnitRowRem" className="col-2 bg-danger border-primary" aria-label="RemUnit" type="button" onClick={() => handleUnitRowRemove(roleIndex, rowIndex)}><i className="fas fa-minus" /></button>}
      </div>
    </div>
  );
};

UnitChoice.propTypes = {
  roleIndex: PropTypes.number,
  rowIndex: PropTypes.number,
};

UnitChoice.defaultProps = {
  roleIndex: null,
  rowIndex: null,
};

export default UnitChoice;
