import React from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase/app';
import PageTitle from '../atoms/PageTitle';
import user from '../Redux/reducers/user';
import TextInputRow from '../atoms/TextInputRow';
import SubmitButton from '../atoms/SubmitButton';
import UserChange from '../Redux/actions/UserChange/UserChange';
import store from '../Redux/store';

const ViewProfilePage = () => {
  const [userInfo, setUserInfo] = React.useState({
    Name: store.getState().user.Name, Email: store.getState().user.Email, Password: '', Message: '',
  });

  function handleNameInput(input) { setUserInfo({ ...userInfo, Name: input }); }
  function handleEmailInput(input) { setUserInfo({ ...userInfo, Email: input }); }
  function handlePasswordInput(input) { setUserInfo({ ...userInfo, Password: input }); }

  async function newNameSubmission(event) {
    event.preventDefault();
    await firebase.auth().currentUser.updateProfile({ displayName: userInfo.Name }).then(() => {
      store.dispatch(UserChange({ ...store.getState().user, Name: userInfo.Name }));
      setUserInfo({ ...userInfo, Message: 'Name successfully changed' });
    }).catch((error) => {
      setUserInfo({ ...userInfo, Message: error.message });
    });
  }

  async function newEmailSubmission(event) {
    event.preventDefault();
    await firebase.auth().currentUser.updateEmail(userInfo.Email).then(() => {
      store.dispatch(UserChange({ ...store.getState().user, Email: userInfo.Email }));
      setUserInfo({ ...userInfo, Message: 'Email successfully changed' });
    }).catch((error) => {
      setUserInfo({ ...userInfo, Message: error.message });
    });
  }

  async function newPasswordSubmission(event) {
    event.preventDefault();
    await firebase.auth().currentUser.updatePassword(userInfo.Password).then(() => {
      setUserInfo({ ...userInfo, Message: 'Password successfully changed' });
    }).catch((error) => {
      setUserInfo({ ...userInfo, Message: error.message });
    });
  }

  return (
    <div data-test="ViewProfilePage" className="container-fluid p-padding text-center">
      <PageTitle Title="View Profile Page" />
      <form data-test="submitName" onSubmit={(e) => newNameSubmission(e)}>
        <TextInputRow type="text" left="Display Name:" startValue={userInfo.Name} onInputChange={handleNameInput} />
        <SubmitButton buttontext="Change Name" />
      </form>
      <form data-test="submitEmail" className="mt-5" onSubmit={(e) => newEmailSubmission(e)}>
        <TextInputRow type="email" left="Account Email:" startValue={userInfo.Email} onInputChange={handleEmailInput} />
        <SubmitButton buttontext="Change Email" />
      </form>
      <form data-test="submitPassword" className="mt-5" onSubmit={(e) => newPasswordSubmission(e)}>
        <TextInputRow type="password" left="Account Password:" startValue={userInfo.Password} onInputChange={handlePasswordInput} />
        <SubmitButton buttontext="Change Password" />
      </form>
      <div className="text-info mt-4">{userInfo.Message}</div>
    </div>
  );
};

export default connect(user)(ViewProfilePage);
