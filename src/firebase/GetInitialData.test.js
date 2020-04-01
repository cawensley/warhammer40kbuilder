import firebase from 'firebase/app';
import firestore from '../utilities/mockFirestore';
import GetInitialData from './GetInitialData';
import store from '../Redux/store';
import UserChange from '../Redux/actions/UserChange/UserChange';
import { mockUser } from '../utilities/mockConstants';

firebase.firestore = firestore;

test('GetInitialData grabs six collections ', () => {
  store.dispatch(UserChange(
    { uid: mockUser.uid, Name: mockUser.displayName, Email: mockUser.email },
  ));
  GetInitialData();

  expect(firestore().collection).toHaveBeenCalledWith('codices');
  expect(firestore().collection).toHaveBeenCalledWith('Roles');
  expect(firestore().collection).toHaveBeenCalledWith('equipment');
  expect(firestore().collection).toHaveBeenCalledWith('units');
  expect(firestore().collection).toHaveBeenCalledWith('squads');
  expect(firestore().collection).toHaveBeenCalledWith('armies');
});
