import React, {useEffect, useState} from 'react';
import firebase from "../firebase/firebase";
import PageLoading from "./PageLoading";

function IDtoName ({collectionName,uniqueID}) {
    const [isLoading, setisLoading] = useState(false);
    const [originalName,setOriginalName]=useState('');

    function getThingInfo () {
        setisLoading(true);
        firebase.db.collection(`${collectionName}`).doc(uniqueID).get()
            .then(doc=>{setOriginalName(doc.data().Name);});
        setisLoading(false);
    }

    // eslint-disable-next-line
    useEffect(()=>{getThingInfo()},[]);

    if (isLoading) { return (<PageLoading />); }

    return (
        <div>{originalName}</div>
    )
}

export default IDtoName;