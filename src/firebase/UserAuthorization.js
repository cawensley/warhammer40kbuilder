import firebase from 'firebase/app';
import 'firebase/auth';
import store from '../Redux/store';
import UserChange from '../Redux/actions/UserChange';
import GetInitialData from './GetInitialData';

function UserAuthorization() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      store.dispatch(UserChange({ uid: user.uid, Name: user.displayName, Email: user.email }));
      GetInitialData();
    } else {
      store.dispatch(UserChange(null));
    }
  });
}

export default UserAuthorization;
