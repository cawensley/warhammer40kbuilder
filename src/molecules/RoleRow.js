import React from 'react';
import store from "../Redux/store";
import RoleChange from "../Redux/actions/RoleChange";

function RoleRow ({left}) {

    return (
        <div className="row mt-4">
            <div className="text-warning col-6 text-right">{left}</div>
            <div className="col-6 text-left">
                <select
                    id="Role"
                    className="bg-white"
                    value={store.getState().role}
                    onChange={event => store.dispatch(RoleChange(event.target.value))}>
                    {store.getState().roles.map((choice) => (<option key={choice.id} value={choice.id}>{choice.Name}</option>))}
                </select>
            </div>
        </div>
    )
}

export default RoleRow;