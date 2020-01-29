import React, {useContext} from 'react';
import PageTitle from "../atoms/PageTitle";
import FirebaseContext from "../firebase/FirebaseContext";

function LoginPage () {
    const {setisLoggedIn} = useContext(FirebaseContext);

    function handleLogin () {
        setisLoggedIn(true);
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