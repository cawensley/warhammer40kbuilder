import React from 'react';
import PageTitle from "../../atoms/PageTitle";
import firebase from "../../firebase/firebase";
import CodexFilter from "../../atoms/CodexFilter";
import store from "../../Redux/store";
import SubmitButton from "../../atoms/SubmitButton";
import InputRow from "../../atoms/InputRow";
import SelectArray from "../../atoms/SelectArray";

function NewUnitsPage () {

    function handleNewUnitSubmission () {
        const newUnit = {
            Codex: store.getState().codexSelection,
            Name: localStorage.getItem("Name"),
            Cost: JSON.parse(localStorage.getItem("Cost")),
            Gear: JSON.parse(localStorage.getItem("Gear")),
        };
        firebase.db.collection("units").add(newUnit);
        window.location.hash = '/units/view';
    }

    return (
        <div className="container-fluid p-padding text-center">
            <PageTitle Title="New Units Page" />
            <form onSubmit={handleNewUnitSubmission}>
                <CodexFilter/>
                <InputRow left="Unit Name:" right="Name" type="text"/>
                <InputRow left="Unit Cost:" right="Cost" type="number"/>
                <SelectArray left="Unit Gear:" right="Gear" collectionName="equipment"/>
                <SubmitButton buttontext="Add Unit to Database"/>
            </form>
        </div>
    )
}

export default NewUnitsPage;