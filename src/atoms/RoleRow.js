import React, {useContext} from 'react';
import FirebaseContext from "../firebase/FirebaseContext";

function RoleRow ({left}) {
    const {role,setRole,roles} = useContext(FirebaseContext);

    return (
        <div className="row mt-4">
            <div className="text-warning col-6 text-right">{left}</div>
            <div className="col-6 text-left">
                <select
                    id="Role"
                    className="bg-white"
                    value={role}
                    onChange={event => setRole(event.target.value)}>
                    {roles.map((choice) => (<option key={choice.id} value={choice.id}>{choice.Name}</option>))}
                </select>
            </div>
        </div>
    )
}

export default RoleRow;