import React from 'react';
import store from "../Redux/store";
import CodexChange from "../Redux/actions/CodexChange";

function CodexFilter () {

    return (
        <div data-test="codexFilter" className="row mt-4">
            <div className="text-warning col-6 text-right">Codex:</div>
            <div className="col-6 text-left">
                <select
                    data-test="inputbox"
                    id="PageSelection"
                    className="bg-white"
                    value={store.getState().codex}
                    onChange={event => {store.dispatch(CodexChange(event.target.value));}}>
                    {store.getState().codices.map((codex) => (<option data-test="options" key={codex.id} value={codex.id}>{codex.Name}</option>))}
                </select>
            </div>
        </div>
    )
}

export default CodexFilter;