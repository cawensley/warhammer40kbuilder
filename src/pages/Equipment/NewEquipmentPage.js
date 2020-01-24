import React,{useRef} from 'react';
import PageTitle from "../../atoms/PageTitle";
import firebase from "../../firebase/firebase";
import CodexFilter from "../../atoms/CodexFilter";
import store from "../../Redux/store";
import SubmitButton from "../../atoms/SubmitButton";

function NewEquipmentPage () {
    const newItemName = useRef('');
    const newItemCost = useRef('');

    function handleNewItemSubmission () {
        const newItem = {
            Codex: store.getState().codexSelection,
            Name: newItemName.current,
            Cost: Number(newItemCost.current)
        };
        firebase.db.collection("equipment").add(newItem);
        window.location.hash = '/equipment/view';
    }

    return (
        <div className="container-fluid p-padding text-center">
            <PageTitle Title="New Equipment Page" />
            <form onSubmit={handleNewItemSubmission}>
                <CodexFilter/>
                <div className="row mt-4">
                    <div className="text-warning col-6 text-right">Equipment Name:</div>
                    <div className="text-white col-6 text-left">
                        <input
                            onChange={e=>newItemName.current=e.target.value}
                            placeholder="Enter Equipment Name"
                            type="text">
                        </input>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="text-warning col-6 text-right">Equipment Cost:</div>
                    <div className="text-white col-6 text-left">
                        <input
                            onChange={e=>newItemCost.current=e.target.value}
                            placeholder="Enter Equipment Cost"
                            type="number">
                        </input>
                    </div>
                </div>
                <SubmitButton buttontext="Add Equipment to Database"/>
            </form>
        </div>
    )
}

export default NewEquipmentPage;