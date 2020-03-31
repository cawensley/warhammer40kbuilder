import firebase from 'firebase/app';
import { auth, firestore } from '../utilities/setupTests';
import UserAuthorization from './UserAuthorization';

firebase.firestore = firestore;
firebase.auth = auth;

test('UserAuthorization sets up onAuthStateChanged listener', () => {
  UserAuthorization();

  expect(auth().onAuthStateChanged).toHaveBeenCalled();
});
