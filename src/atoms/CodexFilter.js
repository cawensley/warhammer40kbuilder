import React, {useContext} from 'react';
import FirebaseContext from "../firebase/FirebaseContext";

function CodexFilter () {
    const {codex,setCodex,codices}=useContext(FirebaseContext);

    return (
        <div className="row mt-4">
            <div className="text-warning col-6 text-right">Codex:</div>
            <div className="col-6 text-left">
                <select
                    id="PageSelection"
                    className="bg-white"
                    value={codex}
                    onChange={event => setCodex(event.target.value)}>
                    {codices.map((codex) => (<option key={codex.id} value={codex.id}>{codex.name}</option>))}
                </select>
            </div>
        </div>
    )
}

export default CodexFilter;