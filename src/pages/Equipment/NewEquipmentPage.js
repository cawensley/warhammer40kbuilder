import React from 'react';
import PageTitle from "../../atoms/PageTitle";
import firebase from "../../firebase/firebase";
import CodexFilter from "../../atoms/CodexFilter";
import store from "../../Redux/store";
import SubmitButton from "../../atoms/SubmitButton";
import InputRow from "../../atoms/InputRow";

function NewEquipmentPage () {

    function handleNewItemSubmission () {
        const newItem = {
            Codex: store.getState().codexSelection,
            Name: localStorage.getItem("Name"),
            Cost: JSON.parse(localStorage.getItem("Cost"))
        };
        firebase.db.collection("equipment").add(newItem);
        window.location.hash = '/equipment/view';
    }

    return (
        <div className="container-fluid p-padding text-center">
            <PageTitle Title="New Equipment Page" />
            <form onSubmit={handleNewItemSubmission}>
                <CodexFilter/>
                <InputRow left="Equipment Name:" right="Name" type="text"/>
                <InputRow left="Equipment Cost:" right="Cost" type="number"/>
                <SubmitButton buttontext="Add Equipment to Database"/>
            </form>
        </div>
    )
}

export default NewEquipmentPage;