import React from 'react';
import firebase from "../firebase/firebase";

function DeleteButton ({ collectionName,uniqueID }) {

    function RemoveItem () {
        const linkRef = firebase.db.collection(`${collectionName}`).doc(uniqueID);
        linkRef.delete().then(()=>{window.location.reload(true)})
            .catch(error=>{console.log("Error deleting document:",error)});
    }

    return (
        <button
            type="submit"
            value="Submit"
            className="btn btn-danger btn-sm"
            onClick={() => RemoveItem()}
        >
            Delete
        </button>
    );
}

export default DeleteButton;