import React from 'react';
import PageTitle from "../atoms/PageTitle";
import store from "../Redux/store";
import LoginChange from "../Redux/actions/LoginChange";

function LoginPage () {

    function handleLogin () {
        store.dispatch(LoginChange(true));
        window.location.hash = '/armies/view';
    }

    return (
        <div className="container-fluid p-padding text-center">
            <PageTitle Title="Login Page" />
            <button type="button" className="btn btn-success" onClick={handleLogin}>Login</button>
        </div>
    )
}

export default LoginPage;