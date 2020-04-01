import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PageTitle from '../../atoms/PageTitle';
import CodexFilter from '../../molecules/CodexFilter';
import RedirectButton from '../../atoms/RedirectButton';
import DeleteButton from '../../molecules/DeleteButton';
import store from '../../Redux/store';
import equipment from '../../Redux/reducers/equipment';
import codexFilter from '../../utilities/codexFilter';

const ViewEquipmentPage = () => (
  <div data-test="ViewEquipmentPage" className="container-fluid p-padding text-center">
    <PageTitle Title="View Equipment Page" />
    <CodexFilter />
    <RedirectButton redirect="/equipment/new" buttontext="Add Equipment" />
    <div className="row justify-content-center mt-3">
      <div className="col-xl-6 col-md-10">
        <h3 className="row text-warning">
          <div className="col-6">Name</div>
          <div className="col-3">Cost</div>
          <div className="col-3" />
        </h3>
        {codexFilter(store.getState().equipment).map((item) => (
          <div data-test="equipDisplay" key={item.id} className="row text-white align-items-center border border-secondary">
            <Link
              to={`/equipment/edit/${item.id}`}
              className="col-6 p-hyperlink-color"
            >
              {item.Name}
            </Link>
            <div className="col-3">{item.Cost}</div>
            <div className="col-3"><DeleteButton collectionName="equipment" uniqueID={item.id} /></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default connect(equipment)(ViewEquipmentPage);
