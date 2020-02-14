import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PageTitle from '../../atoms/PageTitle';
import CodexFilter from '../../molecules/CodexFilter';
import RedirectButton from '../../atoms/RedirectButton';
import DeleteButton from '../../molecules/DeleteButton';
import IDtoName from '../../atoms/IDtoName';
import store from '../../Redux/store';
import squads from '../../Redux/reducers/squads';
import codexFilter from '../../utilities/codexFilter';

function ViewSquadsPage() {
  return (
    <div data-test="ViewSquadsPage" className="container-fluid p-padding text-center">
      <PageTitle Title="View Squads Page" />
      <CodexFilter />
      <RedirectButton redirect="/squads/new" buttontext="Add Squads" />
      <div className="row justify-content-center mt-4">
        <div className="col-xl-8">
          <div className="row h3 text-warning">
            <div className="col-3">Name</div>
            <div className="col-2">Role</div>
            <div className="col-2">Min. Size</div>
            <div className="col-2">Max. Size</div>
            <div className="col-2">Units</div>
            <div className="col-1" />
          </div>
          {codexFilter(store.getState().squads).map((squad) => (
            <div data-test="squadsDisplay" key={squad.id} className="row text-white align-items-center border border-secondary">
              <Link
                to={`/squads/edit/${squad.id}`}
                className="col-3 p-hyperlink-color"
              >
                {squad.Name}
              </Link>
              <div className="col-2"><IDtoName searchArray={store.getState().roles} uniqueID={squad.Role} /></div>
              <div className="col-2">{squad.MinSize}</div>
              <div className="col-2">{squad.MaxSize}</div>
              <div className="col-2">
                {squad.Units.map((item) => (
                  <IDtoName
                    key={item}
                    searchArray={codexFilter(store.getState().units)}
                    uniqueID={item}
                  />
                ))}
              </div>
              <div className="col-1"><DeleteButton collectionName="squads" uniqueID={squad.id} /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default connect(squads)(ViewSquadsPage);
