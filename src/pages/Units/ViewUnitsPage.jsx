import React from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import PageTitle from '../../atoms/PageTitle';
import CodexFilter from '../../molecules/CodexFilter';
import RedirectButton from '../../atoms/RedirectButton';
import DeleteButton from '../../molecules/DeleteButton';
import store from '../../Redux/store';
import units from '../../Redux/reducers/units';
import codexFilter from '../../utilities/codexFilter';
import { findRealEquipmentName } from '../../utilities/findName';

const ViewUnitsPage = () => (
  <div data-test="ViewUnitsPage" className="container-fluid p-padding text-center">
    <PageTitle Title="View Units Page" />
    <CodexFilter />
    <RedirectButton redirect="/units/new" buttontext="Add Units" />
    <div className="row justify-content-center mt-3">
      <div className="col-xl-8">
        <h3 className="row text-warning">
          <div className="col-2">Name</div>
          <div className="col-1">Cost</div>
          <div className="col-4">Abilities</div>
          <div className="col-3">Gear</div>
          <div className="col-2" />
        </h3>
        {codexFilter(store.getState().units).map((unit) => (
          <div data-test="unitsDisplay" key={unit.id} className="row text-white align-items-center border border-secondary">
            <Link
              to={`/units/edit/${unit.id}`}
              className="col-2 p-hyperlink-color"
            >
              {unit.Name}
            </Link>
            <div className="col-1">{unit.Cost}</div>
            <div className="col-4">{unit.Abilities}</div>
            <div className="col-3">
              {unit.Gear.map(
                (item) => <div key={uuidv4()}>{findRealEquipmentName(item)}</div>,
              )}
            </div>
            <div className="col-2"><DeleteButton collectionName="units" uniqueID={unit.id} /></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default connect(units)(ViewUnitsPage);
