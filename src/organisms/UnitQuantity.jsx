import React from 'react';
import PropTypes from 'prop-types';
import store from '../Redux/store';
import findPreviousSquad from '../utilities/findPreviousSquad';
import ArmyUnitQTYChange from '../Redux/actions/ArmyUnitQTYChange';

function UnitQuantity({ roleIndex, rowIndex }) {
  const [choices, setChoices] = React.useState([]);
  const minChoice = findPreviousSquad(roleIndex, rowIndex)[0].MinSize;
  const maxChoice = findPreviousSquad(roleIndex, rowIndex)[0].MaxSize;

  React.useEffect(() => {
    const newChoices = [];
    for (let i = minChoice; i <= maxChoice; i += 1) { newChoices.push(i); }
    setChoices(newChoices);
    if (
      !newChoices.includes(+store.getState().army.SquadArray[roleIndex].Squads[rowIndex].UnitQTY)
    ) {
      store.dispatch(ArmyUnitQTYChange({ roleIndex, rowIndex, UnitQTY: newChoices[0] }));
    }
    // eslint-disable-next-line
  }, [maxChoice]);

  return (
    <select
      data-test="selectInput"
      className="bg-white col-2"
      value={store.getState().army.SquadArray[roleIndex].Squads[rowIndex].UnitQTY}
      onChange={(event) => store.dispatch(ArmyUnitQTYChange(
        { roleIndex, rowIndex, UnitQTY: event.target.value },
      ))}
    >
      {(choices.length > 0)
        ? choices.map(
          (choice) => <option key={choice} value={choice}>{choice}</option>,
        )
        : <option key="0" value="0">No Array Provided</option>}
    </select>
  );
}

UnitQuantity.propTypes = {
  roleIndex: PropTypes.number,
  rowIndex: PropTypes.number,
};

UnitQuantity.defaultProps = {
  roleIndex: null,
  rowIndex: null,
};

export default UnitQuantity;
