import React, {useEffect, useState} from 'react';
import FirebaseContext from "./FirebaseContext";
import firebase from "./firebase";
import PageLoading from "../atoms/PageLoading";

const GlobalState = ({children}) => {
    const [isLoading, setisLoading] = useState(false);
    const [isLoggedIn,setisLoggedIn]=useState(false);
    const [codices,setCodices] = useState([]);
    const [codex,setCodex]=useState("75354kSpFNsaDqTqIT6i");
    const [roles,setRoles] = useState([]);
    const [role,setRole] = useState("g5ffh3LG3s8zZqUZKw9y");

    function getInitialData () {
        setisLoading(true);
        firebase.db.collection("codices").get().then(snapshot => {
            const rawdata = snapshot.docs.map(doc => {
                return {id: doc.id,...doc.data()}
            });
            setCodices(rawdata);
        });
        setisLoading(true);
        firebase.db.collection("Roles").get().then(snapshot => {
            const rawdata = snapshot.docs.map(doc => {
                return {id: doc.id,...doc.data()}
            });
            setRoles(rawdata);
        });
        setisLoading(false);
    }

    // eslint-disable-next-line
    useEffect(()=>{getInitialData()},[]);

    if (isLoading) { return (<PageLoading />); }

    return (
        <FirebaseContext.Provider value={{isLoggedIn,setisLoggedIn,codex,setCodex,codices,role,setRole,roles}}>
            {children}
        </FirebaseContext.Provider>)
};

export default GlobalState;