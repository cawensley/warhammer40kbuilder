import firebase from 'firebase/app';
import auth from '../utilities/mockAuth';
import UserAuthorization from './UserAuthorization';
import firestore from '../utilities/mockFirestore';

firebase.firestore = firestore;
firebase.auth = auth;

test('UserAuthorization sets up onAuthStateChanged listener', () => {
  UserAuthorization();
  expect(auth().onAuthStateChanged).toHaveBeenCalled();
});
