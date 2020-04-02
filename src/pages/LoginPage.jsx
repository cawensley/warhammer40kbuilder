import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import PageTitle from '../atoms/PageTitle';
import TextInputRow from '../atoms/TextInputRow';
import SubmitButton from '../atoms/SubmitButton';

const LoginPage = () => {
  const [userInfo, setUserInfo] = React.useState({ Email: '', Password: '', Error: '' });

  function handleEmailInput(input) { setUserInfo({ ...userInfo, Email: input }); }
  function handlePasswordInput(input) { setUserInfo({ ...userInfo, Password: input }); }

  async function userLogin() {
    await firebase.auth().signInWithEmailAndPassword(userInfo.Email, userInfo.Password).then(() => {
      window.location = '/';
    }).catch((error) => {
      setUserInfo({ ...userInfo, Error: error.message });
    });
  }

  return (
    <div data-test="LoginPage" className="container-fluid p-padding text-center">
      <PageTitle Title="Login Page" />
      <form data-test="submitButton" onSubmit={userLogin}>
        <TextInputRow type="email" left="Account Email:" startValue={userInfo.Email} onInputChange={handleEmailInput} />
        <TextInputRow type="password" left="Account Password:" startValue={userInfo.Password} onInputChange={handlePasswordInput} />
        <SubmitButton buttontext="Login" />
      </form>
      <div className="text-danger mt-4">{userInfo.Error}</div>
    </div>
  );
};

export default LoginPage;
