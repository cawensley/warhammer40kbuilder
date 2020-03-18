import firebase from 'firebase/app';
import firestore from '../utilities/mockFirestore';
import GetInitialData from './GetInitialData';
import store from '../Redux/store';
import UserChange from '../Redux/actions/UserChange';

firebase.firestore = firestore;

const mockUser = { uid: '999999', displayName: 'BobbyJoe', Email: 'bobbyJoe@gmail.com' };

test('GetInitialData grabs five collections ', () => {
  store.dispatch(UserChange(
    { uid: mockUser.uid, Name: mockUser.displayName, Email: mockUser.email },
  ));
  GetInitialData();
  expect(firestore().collection).toHaveBeenCalledWith('codices');
  expect(firestore().collection).toHaveBeenCalledWith('Roles');
  expect(firestore().collection).toHaveBeenCalledWith('equipment');
  expect(firestore().collection).toHaveBeenCalledWith('units');
  expect(firestore().collection).toHaveBeenCalledWith('squads');
});
