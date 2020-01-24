import React,{useRef} from 'react';
import PageTitle from "../../atoms/PageTitle";
import firebase from "../../firebase/firebase";
import CodexFilter from "../../atoms/CodexFilter";
import store from "../../Redux/store";

function NewEquipmentPage () {
    const newItemName = useRef('');
    const newItemCost = useRef('');

    function handleSubmit () {
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
            <form onSubmit={handleSubmit}>
                <CodexFilter/>
                <div className="text-warning my-3">Equipment Name:
                    <input
                    onChange={e=>newItemName.current=e.target.value}
                    placeholder="Enter Equipment Name"
                    className="ml-2"
                    type="text">
                    </input>
                </div>
                <div className="text-warning my-3">Equipment Cost:
                    <input
                        onChange={e=>newItemCost.current=e.target.value}
                        placeholder="Enter Equpment Cost"
                        className="ml-2"
                        type="number">
                    </input>
                </div>
                <button className="btn btn-success mt-2" type="submit">
                    Add Equipment to Database
                </button>
            </form>
        </div>
    )
}

export default NewEquipmentPage;