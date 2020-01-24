import React, {useEffect, useState} from 'react';
import firebase from "../firebase/firebase";
import PageLoading from "./PageLoading";
import store from "../Redux/store";
import CodexChange from "../Redux/actions/CodexChange";

function CodexFilter () {
    const [codices,setCodices] = useState([]);
    const [codexFilter,setCodexFilter]=useState(store.getState().codexSelection);
    const [isLoading, setisLoading] = useState(false);

    // eslint-disable-next-line
    useEffect(()=>{getInitialData()},[]);

    function getInitialData () {
        setisLoading(true);
        firebase.db.collection("codices").get().then(snapshot => {
            const rawdata = snapshot.docs.map(doc => {
                return {id: doc.id,...doc.data()}
            });
            setCodices(rawdata);
        });
        setisLoading(false);
    }

    function onCodexChange (event) {
        setCodexFilter(event.target.value);
        store.dispatch(CodexChange(event.target.value));
        window.location.reload(true);
    }

    if (isLoading) { return (<PageLoading />); }

    return (
            <label htmlFor="Codex" className="text-warning">
                Codex Filter:
                <select
                    id="PageSelection"
                    className="bg-white ml-2"
                    value={codexFilter}
                    onChange={event => onCodexChange(event)}>
                    {codices.map((codex) => (<option key={codex.id} value={codex.id}>{codex.name}</option>))}
                </select>
            </label>
    )
}

export default CodexFilter;