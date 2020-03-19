import firebase from 'firebase/app';
import store from '../Redux/store';
import 'firebase/firestore';

export default function handleArmySubmission(input) {
  if (input === 'Add') {
    firebase.firestore().collection('armies').add({
      userID: store.getState().user.uid,
      Name: store.getState().army.Name,
      Points: store.getState().armyPoints,
      Date: {
        Day: new Date().getDate(),
        Month: new Date().getMonth(),
        Year: new Date().getFullYear(),
      },
      exactDate: new Date(),
      SquadArray: store.getState().army.SquadArray,
    });
    window.location.hash = '/userArmies/view';
  } else {
    firebase.firestore().collection('armies').doc(input).set({
      userID: store.getState().user.uid,
      Name: store.getState().army.Name,
      Points: store.getState().armyPoints,
      Date: {
        Day: new Date().getDate(),
        Month: new Date().getMonth(),
        Year: new Date().getFullYear(),
      },
      exactDate: new Date(),
      SquadArray: store.getState().army.SquadArray,
    });
    window.location.hash = '/userArmies/view';
  }
}
