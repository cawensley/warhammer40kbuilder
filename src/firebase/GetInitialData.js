import firebase from "./firebase";
import store from "../Redux/store";
import nameAscend from "../utilities/nameAscend";
import numberAscend from "../utilities/numberAscend";
import CodicesChange from "../Redux/actions/CodicesChange";
import RolesChange from "../Redux/actions/RolesChange";
import EquipmentChange from "../Redux/actions/EquipmentChange";
import UnitsChange from "../Redux/actions/UnitsChange";
import SquadsChange from "../Redux/actions/SquadsChange";

function GetInitialData () {
    firebase.db.collection("codices").get().then(snapshot => {
        const rawdata = snapshot.docs.map(doc => {return {id: doc.id,...doc.data()}});
        rawdata.sort(nameAscend);
        store.dispatch(CodicesChange(rawdata));
    });
    firebase.db.collection("Roles").get().then(snapshot => {
        const rawdata = snapshot.docs.map(doc => {return {id: doc.id,...doc.data()}});
        rawdata.sort(numberAscend);
        store.dispatch(RolesChange(rawdata));
    });
    firebase.db.collection("equipment").onSnapshot(function(snapshot) {
            const rawdata = snapshot.docs.map(doc => {return {id: doc.id,...doc.data()}});
            rawdata.sort(nameAscend);
            console.log("EQUIPMENT DATABASE refreshed");
            store.dispatch(EquipmentChange(rawdata));
        });
    firebase.db.collection("units").onSnapshot(function(snapshot) {
            const rawdata = snapshot.docs.map(doc => {return {id: doc.id,...doc.data()}});
            rawdata.sort(nameAscend);
            console.log("UNITS DATABASE refreshed");
            store.dispatch(UnitsChange(rawdata))
        });
    firebase.db.collection("squads").onSnapshot(function(snapshot) {
            const rawdata = snapshot.docs.map(doc => {return {id: doc.id,...doc.data()}});
            rawdata.sort(nameAscend);
            console.log("SQUADS DATABASE refreshed");
            store.dispatch(SquadsChange(rawdata))
        });
}

export default GetInitialData;