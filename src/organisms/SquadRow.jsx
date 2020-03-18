import React from 'react';
import PropTypes from 'prop-types';
import PageLoading from '../atoms/PageLoading';
import store from '../Redux/store';
import SquadChoice from './SquadChoice';
import UnitQuantity from './UnitQuantity';
import UnitChoice from './UnitChoice';
import EquipmentChoice from './EquipmentChoice';
import calcSquadNumber from '../utilities/calcSquadNumber';
import handleUnitRowAdd from '../utilities/handleUnitRowAdd';
import handleSquadRowAdd from '../utilities/handleSquadRowAdd';
import handleEquipmentRowAdd from '../utilities/handleEquipmentRowAdd';
import handleSquadRowRem from '../utilities/handleSquadRowRem';
import handleEquipmentRowRem from '../utilities/handleEquipmentRowRem';
import handleUnitRowRem from '../utilities/handleUnitRowRem';
import GreyButton from '../atoms/GreyButton';

function SquadRow({ roleIndex }) {
  const displayData = store.getState().army.SquadArray[roleIndex];

  return (store.getState().army.SquadArray[0] === undefined)
    ? (<PageLoading />) : (
      <div className="row justify-content-center mt-4" data-test="SquadRow">
        <div className="col-xl-6 col-md-10">
          <div data-test="RoleRow" className="row mt-4 border border-secondary">
            <div className="col-6 text-right text-warning">
              {displayData.Role.Name}
              :
            </div>
            <div className="col-4 text-left text-white">{calcSquadNumber(displayData.Squads)}</div>
            <button data-test="SquadRowAdd" className="col-1 bg-success border-primary" aria-label="Add" type="button" onClick={() => handleSquadRowAdd(roleIndex)}><i className="fas fa-plus" /></button>
            <button data-test="SquadRowRem" className="col-1 bg-danger border-primary" aria-label="Rem" type="button" onClick={() => handleSquadRowRem(roleIndex)}><i className="fas fa-minus" /></button>
          </div>
          {(displayData.Squads.length > 0)
            ? (
              <div className="row">
                <div className="col-2 text-warning">Squads</div>
                <div className="col-1 text-warning">Qty</div>
                <div className="col-2 text-warning">Units</div>
                <div className="col-2 text-warning">Unit +/-</div>
                <div className="col-3 text-warning">Gear</div>
                <div className="col-2 text-warning">Gear +/-</div>
              </div>
            )
            : <div />}
          <div>
            {(displayData.Squads.length > 0)
              ? (displayData.Squads.map((rowitem, rowIndex) => (
                <div key={rowIndex} className="row">
                  {(rowitem.Squad) ? <SquadChoice roleIndex={roleIndex} rowIndex={rowIndex} /> : <div className="col-2" />}
                  {(rowitem.Unit)
                    ? (
                      <div className="col-5">
                        <div className="row">
                          <UnitQuantity roleIndex={roleIndex} rowIndex={rowIndex} />
                          <UnitChoice roleIndex={roleIndex} rowIndex={rowIndex} />
                          <button data-test="UnitRowAdd" className="col-2 bg-success border-primary" aria-label="AddUnit" type="button" onClick={() => handleUnitRowAdd(roleIndex, rowIndex)}><i className="fas fa-plus" /></button>
                          {(rowitem.Squad)
                            ? <GreyButton />
                            : <button data-test="UnitRowRem" className="col-2 bg-danger border-primary" aria-label="RemUnit" type="button" onClick={() => handleUnitRowRem(roleIndex, rowIndex)}><i className="fas fa-minus" /></button>}
                        </div>
                      </div>
                    )
                    : <div className="col-5" />}
                  <div className="col-5">
                    <div className="row">
                      <EquipmentChoice roleIndex={roleIndex} rowIndex={rowIndex} />
                      <button data-test="EquipRowAdd" className="col-2 bg-success border-primary" aria-label="AddGear" type="button" onClick={() => handleEquipmentRowAdd(roleIndex, rowIndex)}><i className="fas fa-plus" /></button>
                      {(rowitem.Unit)
                        ? <GreyButton />
                        : <button data-test="EquipRowRem" className="col-2 bg-danger border-primary" aria-label="RemGear" type="button" onClick={() => handleEquipmentRowRem(roleIndex, rowIndex)}><i className="fas fa-minus" /></button>}
                    </div>
                  </div>
                </div>
              )))
              : <div />}
          </div>
        </div>
      </div>
    );
}

SquadRow.propTypes = {
  roleIndex: PropTypes.number,
};

SquadRow.defaultProps = {
  roleIndex: null,
};

export default SquadRow;
