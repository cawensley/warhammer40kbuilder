import React, {useEffect, useState} from 'react';
import firebase from "../firebase/firebase";
import store from "../Redux/store";
import PageLoading from "./PageLoading";
import IDtoName from "./IDtoName";

function SelectArray ({left,right,collectionName}) {
    const [isLoading, setisLoading] = useState(false);
    const [filteredCollection,setFilteredCollection]=useState([]);
    const [thingSelected,setThingSelected]=useState('');

    function getArrayData () {
        setisLoading(true);
        firebase.db.collection(`${collectionName}`).get().then(snapshot => {
            const rawdata = snapshot.docs.map(doc => {
                return {id: doc.id,...doc.data()}
            });
            const filterArray = rawdata.filter((item)=>item.Codex.includes(store.getState().codexSelection));
            setFilteredCollection(filterArray);
            if (filterArray.length>0) {setThingSelected(filterArray[0].id)}
        });
        setisLoading(false);
    }

    // eslint-disable-next-line
    useEffect(()=>{getArrayData()},[]);

    function onThingAdd () {
        var biggerArray = JSON.parse(localStorage.getItem(`${right}`));
        biggerArray.push(thingSelected);
        localStorage.setItem(`${right}`,JSON.stringify(biggerArray));
        window.location.reload(true)
    }

    function onClear () {
        localStorage.setItem(`${right}`,JSON.stringify([]));
        window.location.reload(true)
    }

    if (isLoading) { return (<PageLoading />); }

    return (
        <div>
            <div className="row mt-4">
                <div className="text-warning col-6 text-right">{left}</div>
                <div className="text-white col-6 text-left">
                    <select
                        id="ThingSelection"
                        className="bg-white"
                        value={thingSelected}
                        onChange={event => setThingSelected(event.target.value)}>
                        {filteredCollection.map((item) => (<option key={item.id} value={item.id}>{item.Name}</option>))}
                    </select>
                    <button type="button" className="btn btn-success ml-2" onClick={onThingAdd}>Add</button>
                    <button type="button" className="btn btn-danger ml-2" onClick={onClear}>Clear</button>
                </div>
            </div>
            <div className="row mt-4">
                <div className="text-warning col-6 text-right">{right} Chosen:</div>
                <div className="text-white col-6 text-left">
                    {JSON.parse(localStorage.getItem(`${right}`)).map((item)=><IDtoName key={item} collectionName={"equipment"} uniqueID={item}/>)}
                </div>
            </div>
        </div>
    )
}

export default SelectArray;