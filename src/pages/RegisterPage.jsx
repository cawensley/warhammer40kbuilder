import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import PageTitle from '../atoms/PageTitle';
import TextInputRow from '../atoms/TextInputRow';
import SubmitButton from '../atoms/SubmitButton';
import store from '../Redux/store';
import UserChange from '../Redux/actions/UserChange';

function RegisterPage() {
  const [userInfo, setUserInfo] = React.useState({
    Name: '', Email: '', Password: '', Error: '',
  });

  function handleNameInput(input) { setUserInfo({ ...userInfo, Name: input }); }
  function handleEmailInput(input) { setUserInfo({ ...userInfo, Email: input }); }
  function handlePasswordInput(input) { setUserInfo({ ...userInfo, Password: input }); }

  async function newUserSubmission() {
    await firebase.auth().createUserWithEmailAndPassword(userInfo.Email, userInfo.Password)
      .then(async () => {
        await firebase.auth().currentUser.updateProfile({ displayName: userInfo.Name });
        store.dispatch(UserChange({ ...store.getState().user, Name: userInfo.Name }));
      })
      .then(() => { window.location.hash = '/'; })
      .catch((error) => {
        setUserInfo({ ...userInfo, Error: error.message });
      });
  }

  return (
    <div data-test="RegisterPage" className="container-fluid p-padding text-center">
      <PageTitle Title="Register Page" />
      <form data-test="submitButton" onSubmit={newUserSubmission}>
        <TextInputRow type="text" left="Your Name:" startValue={userInfo.Name} onInputChange={handleNameInput} />
        <TextInputRow type="email" left="New Account Login Email:" startValue={userInfo.Email} onInputChange={handleEmailInput} />
        <TextInputRow type="password" left="New Account Login Password:" startValue={userInfo.Password} onInputChange={handlePasswordInput} />
        <SubmitButton buttontext="Create New User" />
      </form>
      <div className="text-danger mt-4">{userInfo.Error}</div>
    </div>
  );
}

export default RegisterPage;
