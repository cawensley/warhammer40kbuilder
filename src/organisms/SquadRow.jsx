import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import PageLoading from '../atoms/PageLoading';
import store from '../Redux/store';
import SquadChoice from './SquadChoice';
import UnitChoice from './UnitChoice';
import EquipmentChoice from './EquipmentChoice';
import calcSquadNumber from '../utilities/calcSquadNumber';
import { handleSquadRowAdd } from '../utilities/handleRowAdd';
import { handleSquadRowRemove } from '../utilities/handleRowRemove';

const SquadRow = ({ roleIndex }) => {
  const displayData = store.getState().army.SquadArray[roleIndex];

  if (store.getState().army.SquadArray[0] === undefined) { return <PageLoading />; }

  return (
    <div className="row justify-content-center mt-4" data-test="SquadRow">
      <div className="col-xl-6 col-md-10">
        <div data-test="RoleRow" className="row mt-4 border border-secondary">
          <div className="col-6 text-right text-warning">
            {displayData.Role.Name}
            :
          </div>
          <div className="col-4 text-left text-white">{calcSquadNumber(displayData.Squads)}</div>
          <button data-test="SquadRowAdd" className="col-1 bg-success border-primary" aria-label="Add" type="button" onClick={() => handleSquadRowAdd(roleIndex)}><i className="fas fa-plus" /></button>
          <button data-test="SquadRowRem" className="col-1 bg-danger border-primary" aria-label="Rem" type="button" onClick={() => handleSquadRowRemove(roleIndex)}><i className="fas fa-minus" /></button>
        </div>
        {(displayData.Squads.length > 0)
          ? (
            <div>
              <div className="row">
                <div className="col-2 text-warning">
                  Squad&nbsp;
                  <small>(min-max)</small>
                </div>
                <div className="col-1 text-warning">Qty</div>
                <div className="col-2 text-warning">Units</div>
                <div className="col-2 text-warning">Unit +/-</div>
                <div className="col-3 text-warning">Gear</div>
                <div className="col-2 text-warning">Gear +/-</div>
              </div>
              {displayData.Squads.map((rowitem, rowIndex) => (
                <div key={uuidv4()} className="row">
                  <SquadChoice roleIndex={roleIndex} rowIndex={rowIndex} />
                  <UnitChoice roleIndex={roleIndex} rowIndex={rowIndex} />
                  <EquipmentChoice roleIndex={roleIndex} rowIndex={rowIndex} />
                </div>
              ))}
            </div>
          )
          : <div />}
      </div>
    </div>
  );
};

SquadRow.propTypes = {
  roleIndex: PropTypes.number,
};

SquadRow.defaultProps = {
  roleIndex: null,
};

export default SquadRow;
