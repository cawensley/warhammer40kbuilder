import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import PageTitle from '../atoms/PageTitle';
import TextInputRow from '../atoms/TextInputRow';
import SubmitButton from '../atoms/SubmitButton';

const ForgotPasswordPage = () => {
  const [userInfo, setUserInfo] = React.useState({ Email: '', Message: '' });

  function handleEmailInput(input) { setUserInfo({ ...userInfo, Email: input }); }

  async function ResetPassword() {
    await firebase.auth().sendPasswordResetEmail(userInfo.Email).then(() => {
      setUserInfo({ ...userInfo, Message: 'Check your Email for password reset instructions' });
    }).catch((error) => {
      setUserInfo({ ...userInfo, Message: error.message });
    });
  }

  return (
    <div data-test="ForgotPasswordPage" className="container-fluid p-padding text-center">
      <PageTitle Title="Forgot Password?" />
      <form data-test="submitButton" onSubmit={ResetPassword}>
        <TextInputRow type="email" left="Account Email:" startValue={userInfo.Email} onInputChange={handleEmailInput} />
        <SubmitButton buttontext="Send Reset Password Email" />
      </form>
      <div className="text-info mt-4">{userInfo.Message}</div>
    </div>
  );
};

export default ForgotPasswordPage;
