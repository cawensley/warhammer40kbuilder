import React, {useEffect, useState} from 'react';
import firebase from "../firebase/firebase";
import PageLoading from "./PageLoading";

function RoleRow ({left,onInputChange}) {
    const [allRoles,setAllRoles] = useState([]);
    const [role,setRole]=useState('');
    const [isLoading, setisLoading] = useState(false);

    // eslint-disable-next-line
    useEffect(()=>{getInitialData()},[]);

    function getInitialData () {
        setisLoading(true);
        firebase.db.collection("Roles").get().then(snapshot => {
            const rawdata = snapshot.docs.map(doc => {
                return {id: doc.id,...doc.data()}
            });
            setAllRoles(rawdata);
            if (rawdata.length>0) {onRoleChange(rawdata[0].id)}
        });
        setisLoading(false);
    }

    function onRoleChange (roleID) {setRole(roleID);onInputChange(roleID);}

    if (isLoading) { return (<PageLoading />); }

    return (
        <div className="row mt-4">
            <div className="text-warning col-6 text-right">{left}</div>
            <div className="col-6 text-left">
                <select
                    id="Role"
                    className="bg-white"
                    value={role}
                    onChange={event => onRoleChange(event.target.value)}>
                    {allRoles.map((choice) => (<option key={choice.id} value={choice.id}>{choice.Name}</option>))}
                </select>
            </div>
        </div>
    )
}

export default RoleRow;