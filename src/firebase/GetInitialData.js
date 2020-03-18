import firebase from 'firebase/app';
import 'firebase/firestore';
import store from '../Redux/store';
import nameAscend from '../utilities/nameAscend';
import numberAscend from '../utilities/numberAscend';
import CodicesChange from '../Redux/actions/CodicesChange';
import RolesChange from '../Redux/actions/RolesChange';
import EquipmentChange from '../Redux/actions/EquipmentChange';
import UnitsChange from '../Redux/actions/UnitsChange';
import SquadsChange from '../Redux/actions/SquadsChange';
import UserArmiesChange from '../Redux/actions/UserArmiesChange';

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
