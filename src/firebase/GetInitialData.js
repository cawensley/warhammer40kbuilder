import firebase from 'firebase/app';
import 'firebase/firestore';
import store from '../Redux/store';
import { nameAscend, numberAscend } from '../utilities/sortAscending';
import {
  RolesChange, CodicesChange, EquipmentChange, UnitsChange, SquadsChange, UserArmiesChange,
} from '../Redux/actions/index';

function GetInitialData() {
  firebase.firestore().collection('codices').get().then((snapshot) => {
    const rawdata = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    rawdata.sort(nameAscend);
    store.dispatch(CodicesChange(rawdata));
  });
  firebase.firestore().collection('Roles').get().then((snapshot) => {
    const rawdata = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    rawdata.sort(numberAscend);
    store.dispatch(RolesChange(rawdata));
  });
  firebase.firestore().collection('equipment').onSnapshot((snapshot) => {
    const rawdata = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    rawdata.sort(nameAscend);
    store.dispatch(EquipmentChange(rawdata));
  });
  firebase.firestore().collection('units').onSnapshot((snapshot) => {
    const rawdata = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    rawdata.sort(nameAscend);
    store.dispatch(UnitsChange(rawdata));
  });
  firebase.firestore().collection('squads').onSnapshot((snapshot) => {
    const rawdata = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    rawdata.sort(nameAscend);
    store.dispatch(SquadsChange(rawdata));
  });
  firebase.firestore().collection('armies').onSnapshot((snapshot) => {
    const rawdata = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    rawdata.sort(nameAscend);
    store.dispatch(UserArmiesChange(rawdata
      .filter((army) => army.userID === store.getState().user.uid)));
  });
}

export default GetInitialData;
