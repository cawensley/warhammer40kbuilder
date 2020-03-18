import React from 'react';
import { Link } from 'react-router-dom';
import PageTitle from '../../atoms/PageTitle';
import RedirectButton from '../../atoms/RedirectButton';
import DeleteButton from '../../molecules/DeleteButton';
import store from '../../Redux/store';

function ViewArmiesPage() {
  return (
    <div data-test="ViewArmiesPage" className="container-fluid p-padding text-center">
      <PageTitle Title="View Armies Page" />
      <RedirectButton redirect="/armies/new" buttontext="Add Army" />
      <div className="row justify-content-center mt-4">
        <div className="col-xl-8">
          <div className="row h3 text-warning">
            <div className="col-3">Name</div>
            <div className="col-3">Points</div>
            <div className="col-3">Date Created</div>
            <div className="col-3" />
          </div>
          {store.getState().userArmies.map((army) => (
            <div data-test="armyDisplay" key={army.id} className="row text-white align-items-center border border-secondary">
              <Link
                to={`/armies/view/${army.id}`}
                className="col-3 p-hyperlink-color"
              >
                {army.Name}
              </Link>
              <div className="col-3">{army.Points}</div>
              <div className="col-3">
                {army.Date.Month + 1}
                /
                {army.Date.Day}
                /
                {army.Date.Year}
              </div>
              <div className="col-3"><DeleteButton collectionName="armies" uniqueID={army.id} /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewArmiesPage;
