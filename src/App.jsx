import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import MainNavBar from './organisms/MainNavBar';
import NotLoggedInNavBar from './organisms/NotLoggedInNavBar';
import Footer from './organisms/footer';
import HomePage from './pages/HomePage';
import ViewProfilePage from './pages/ViewProfilePage';
import ViewArmiesPage from './pages/Armies/ViewArmiesPage';
import ViewSquadsPage from './pages/Squads/ViewSquadsPage';
import ViewUnitsPage from './pages/Units/ViewUnitsPage';
import ViewEquipmentPage from './pages/Equipment/ViewEquipmentPage';
import NewEquipmentPage from './pages/Equipment/NewEquipmentPage';
import NewUnitsPage from './pages/Units/NewUnitsPage';
import NewSquadsPage from './pages/Squads/NewSquadsPage';
import NewArmiesPage from './pages/Armies/NewArmyPage';
import EditEquipmentPage from './pages/Equipment/EditEquipmentPage';
import EditUnitsPage from './pages/Units/EditUnitsPage';
import EditSquadsPage from './pages/Squads/EditSquadsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import store from './Redux/store';
import user from './Redux/reducers/user';
import UserAuthorization from './firebase/UserAuthorization';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ViewArmyPage from './pages/Armies/ViewArmyPage';
import EditArmyPage from './pages/Armies/EditArmyPage';

function App() {
  React.useEffect(() => UserAuthorization(), []);

  return (store.getState().user) ? (
    <Router data-test="APPLoggedIn">
      <MainNavBar />
      <Switch>
        <Route path="/armies/edit/:ID" component={EditArmyPage} />
        <Route path="/armies/view/:ID" component={ViewArmyPage} />
        <Route path="/armies/view" component={ViewArmiesPage} />
        <Route path="/armies/new" component={NewArmiesPage} />
        <Route path="/squads/view" component={ViewSquadsPage} />
        <Route path="/squads/new" component={NewSquadsPage} />
        <Route path="/squads/edit/:ID" component={EditSquadsPage} />
        <Route path="/units/view" component={ViewUnitsPage} />
        <Route path="/units/new" component={NewUnitsPage} />
        <Route path="/units/edit/:ID" component={EditUnitsPage} />
        <Route path="/equipment/view" component={ViewEquipmentPage} />
        <Route path="/equipment/new" component={NewEquipmentPage} />
        <Route path="/equipment/edit/:ID" component={EditEquipmentPage} />
        <Route path="/userprofile" component={ViewProfilePage} />
        <Route path="/" component={HomePage} />
      </Switch>
      <Footer />
    </Router>
  ) : (
    <Router data-test="APPLoggedOut">
      <NotLoggedInNavBar />
      <Switch>
        <Route path="/auth/login" component={LoginPage} />
        <Route path="/auth/register" component={RegisterPage} />
        <Route path="/auth/passwordreset" component={ForgotPasswordPage} />
        <Route path="/" component={HomePage} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default connect(user)(App);
