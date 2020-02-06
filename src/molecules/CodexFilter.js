import React from 'react';
import store from "../Redux/store";
import CodexChange from "../Redux/actions/CodexChange";

function CodexFilter () {

    return (
        <div className="row mt-4">
            <div className="text-warning col-6 text-right">Codex:</div>
            <div className="col-6 text-left">
                <select
                    id="PageSelection"
                    className="bg-white"
                    value={store.getState().codex}
                    onChange={event => {store.dispatch(CodexChange(event.target.value));}}>
                    {store.getState().codices.map((codex) => (<option key={codex.id} value={codex.id}>{codex.Name}</option>))}
                </select>
            </div>
        </div>
    )
}

export default CodexFilter;