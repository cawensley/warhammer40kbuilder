import React, {useEffect, useState} from 'react';
import IDtoName from "./IDtoName";
import firebase from "../firebase/firebase";
import store from "../Redux/store";
import PageLoading from "./PageLoading";

function DisplayArray ({collectionName,left,array}) {
    const [isLoading, setisLoading] = useState(false);
    const [filteredCollection,setFilteredCollection]=useState([]);

    function getInitialData () {
        setisLoading(true);
        firebase.db.collection(`${collectionName}`).get().then(snapshot => {
            const rawdata = snapshot.docs.map(doc => {
                return {id: doc.id,...doc.data()}
            });
            const filterArray = rawdata.filter((item)=>item.Codex.includes(store.getState().codexSelection));
            setFilteredCollection(filterArray);
        });
        setisLoading(false);
    }

    // eslint-disable-next-line
    useEffect(()=>{getInitialData()},[]);

    if (isLoading) { return (<PageLoading />); }
    return (
        <div className="row mt-4">
            <div className="text-warning col-6 text-right">{left}</div>
            <div className="text-white col-6 text-left">
                {array.length === 0
                    ? "Nothing Selected"
                    : array.map((item)=><IDtoName key={item} searchArray={filteredCollection} uniqueID={item}/>)
                }
            </div>
        </div>
    )
}

export default DisplayArray;