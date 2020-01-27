import React, {useContext, useEffect, useState} from 'react';
import firebase from "../firebase/firebase";
import PageLoading from "./PageLoading";
import FirebaseContext from "../firebase/FirebaseContext";
import compareFunction from "../utilities/compareFunction";
import IDtoName from "./IDtoName";

function SelectArray ({collectionName, left, onItemAdd, onItemRemove,arrayDisplay}) {
    const {codex}=useContext(FirebaseContext);
    const [isLoading, setisLoading] = useState(false);
    const [filteredCollection,setFilteredCollection]=useState([]);
    const [thingSelected,setThingSelected]=useState('');

    function getInitialData () {
        setisLoading(true);
        firebase.db.collection(`${collectionName}`).where('Codex','==',codex)
            .get().then(snapshot => {
            const rawdata = snapshot.docs.map(doc => {
                return {id: doc.id,...doc.data()}
            });
            rawdata.sort(compareFunction);
            setFilteredCollection(rawdata);
            if (rawdata.length > 0) {setThingSelected(rawdata[0].id)}
            else {setThingSelected('')}
        });
        setisLoading(false);
    }

    // eslint-disable-next-line
    useEffect(()=>{getInitialData()},[codex]);

    function onThingAdd () {onItemAdd(thingSelected)}
    function onThingRemove () {onItemRemove()}

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
                    <button type="button" className="btn btn-danger ml-2" onClick={onThingRemove}>Remove Last</button>
                </div>
            </div>
            <div className="row mt-4">
                <div className="text-warning col-6 text-right">Selected&nbsp;{left}</div>
                <div className="text-white col-6 text-left">
                    {arrayDisplay.length === 0
                        ? "Nothing Selected"
                        : arrayDisplay.map((item)=><IDtoName key={item} searchArray={filteredCollection} uniqueID={item}/>)
                    }
                </div>
            </div>
        </div>
    )
}

export default SelectArray;