import React, {useEffect, useState} from 'react';
import FirebaseContext from "./FirebaseContext";
import firebase from "./firebase";
import PageLoading from "../atoms/PageLoading";
import compareFunction from "../utilities/compareFunction";

const GlobalState = ({children}) => {
    const [isLoading, setisLoading] = useState(false);
    const [isLoggedIn,setisLoggedIn]=useState(false);
    const [codices,setCodices] = useState([]);
    const [codex,setCodex]=useState("75354kSpFNsaDqTqIT6i");
    const [roles,setRoles] = useState([]);
    const [role,setRole] = useState("g5ffh3LG3s8zZqUZKw9y");
    const [codexEquipment,setCodexEquipment]= useState([]);
    const [codexUnits,setCodexUnits]= useState([]);
    const [codexSquads,setCodexSquads]= useState([]);

    function getInitialData () {
        setisLoading(true);
        firebase.db.collection("codices").onSnapshot(function(snapshot) {
            const rawdata = snapshot.docs.map(doc => {return {id: doc.id,...doc.data()}});
            setCodices(rawdata);
        });
        setisLoading(true);
        firebase.db.collection("Roles").onSnapshot(function(snapshot) {
            const rawdata = snapshot.docs.map(doc => {return {id: doc.id,...doc.data()}});
            setRoles(rawdata);
        });
        console.log("Finished loading initial data of Codeces and Roles.")
        setisLoading(false);
    }

    function getCodexData () {
        setisLoading(true);
        firebase.db.collection("equipment").where('Codex','==',codex)
            .onSnapshot(function(snapshot) {
            const rawdata = snapshot.docs.map(doc => {return {id: doc.id,...doc.data()}});
            rawdata.sort(compareFunction);
            console.log(rawdata);
            setCodexEquipment(rawdata);
        });
        firebase.db.collection("units").where('Codex','==',codex)
            .onSnapshot(function(snapshot) {
            const rawdata = snapshot.docs.map(doc => {return {id: doc.id,...doc.data()}});
            rawdata.sort(compareFunction);
            console.log(rawdata);
            setCodexUnits(rawdata);
        });
        firebase.db.collection("squads").where('Codex','==',codex)
            .onSnapshot(function(snapshot) {
            const rawdata = snapshot.docs.map(doc => {return {id: doc.id,...doc.data()}});
            rawdata.sort(compareFunction);
            console.log(rawdata);
            setCodexSquads(rawdata);
        });
        console.log("Finished loading initial data for Squads, Units, and Equipment.");
        setisLoading(false);
    }

    // eslint-disable-next-line
    useEffect(()=>{getInitialData()},[]);
    // eslint-disable-next-line
    useEffect(()=>{getCodexData()},[codex]);

    if (isLoading) { return (<PageLoading />); }

    return (
        <FirebaseContext.Provider
            value={{isLoggedIn,setisLoggedIn,codex,setCodex,codices,role,setRole,roles,codexEquipment,codexUnits,codexSquads}}>
            {children}
        </FirebaseContext.Provider>)
};

export default GlobalState;