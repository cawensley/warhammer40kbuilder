import React from 'react';
import { Link } from 'react-router-dom';
import PageTitle from '../atoms/PageTitle';
import store from '../Redux/store';
import './HomePage.scss';
import DisplayText from '../atoms/DisplayText';
import DisplayLink from '../atoms/DisplayLink';
import RedirectButton from '../atoms/RedirectButton';

const HomePage = () => {
  if (!store.getState().user) {
    return (
      <div data-test="HomePage" className="container p-padding text-center">
        <PageTitle Title="Home Page" />
        <h3 className="text-warning"><i>Login to see the Most Recent Armies Added</i></h3>
        <RedirectButton redirect="/auth/login" buttontext="Login" />
        <Link to="/auth/register" className="p-hyperlink-color">
          Dont have an account? Register here
        </Link>
        <br />
        <Link to="/auth/passwordreset" className="p-hyperlink-color">
          Forgot your account password?  Reset password here
        </Link>
        <br />
        <img
          className="border border-secondary p-image-sizeBig mt-4"
          alt="Error Loading"
          src={require('../utilities/Necron_Frontpage.jpg')}
        />
      </div>
    );
  }

  return (
    <div data-test="HomePage" className="container p-padding text-md-center">
      <PageTitle Title="Home Page" />
      <h3 className="text-white-50 text-center"><i>Most Recent Armies Added</i></h3>
      <h3 className="d-none d-md-flex row text-warning mt-4">
        <div className="col-4">Name</div>
        <div className="col-4">Points</div>
        <div className="col-4">Date Created</div>
      </h3>
      {store.getState().homeArmies.map((army) => (
        <div
          data-test="armyDisplay"
          key={army.id}
          className="row text-white align-items-center border border-secondary py-2 py-md-0"
        >
          <DisplayLink columns={4} leftText="Name" rightText={army.Name} linkID={`/armies/view/${army.id}`} userID="99999" />
          <DisplayText columns={4} leftText="Points" rightText={`${army.Points}`} />
          <DisplayText columns={4} leftText="Date Created" rightText={`${army.Date.Month + 1}/${army.Date.Day}/${army.Date.Year}`} />
        </div>
      ))}
    </div>
  );
};

export default HomePage;
