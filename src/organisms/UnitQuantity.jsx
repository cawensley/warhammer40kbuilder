import React from 'react';
import PropTypes from 'prop-types';
import store from '../Redux/store';
import { findPreviousSquad } from '../utilities/findPrevious';
import ArmyUnitQTYChange from '../Redux/actions/ArmyUnitQTYChange/ArmyUnitQTYChange';

const UnitQuantity = ({ roleIndex, rowIndex }) => {
  let choices = [];
  const minChoice = findPreviousSquad(roleIndex, rowIndex).MinSize;
  const maxChoice = findPreviousSquad(roleIndex, rowIndex).MaxSize;
  const currentChoice = store.getState().army.SquadArray[roleIndex].Squads[rowIndex].UnitQTY;

  React.useEffect(() => {
    const newChoices = [];
    for (let i = minChoice; i <= maxChoice; i += 1) { newChoices.push(i); }
    // eslint-disable-next-line
    choices = newChoices;
    if (!newChoices.includes(+currentChoice)) {
      store.dispatch(ArmyUnitQTYChange({ roleIndex, rowIndex, UnitQTY: newChoices[0] }));
    }
  }, [maxChoice, minChoice, roleIndex, rowIndex, currentChoice]);

  return (
    <select
      data-test="selectInput"
      className="bg-white col-2"
      value={currentChoice}
      onChange={(event) => store.dispatch(ArmyUnitQTYChange(
        { roleIndex, rowIndex, UnitQTY: event.target.value },
      ))}
    >
      {choices.map((choice) => (<option key={choice} value={choice}>{choice}</option>))}
    </select>
  );
};

UnitQuantity.propTypes = {
  roleIndex: PropTypes.number,
  rowIndex: PropTypes.number,
};

UnitQuantity.defaultProps = {
  roleIndex: null,
  rowIndex: null,
};

export default UnitQuantity;
