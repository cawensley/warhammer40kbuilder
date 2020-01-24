import React, {useEffect, useRef, useState} from 'react';
import PageTitle from "../../atoms/PageTitle";
import CodexFilter from "../../atoms/CodexFilter";
import store from "../../Redux/store";
import firebase from "../../firebase/firebase";
import PageLoading from "../../atoms/PageLoading";
import SubmitButton from "../../atoms/SubmitButton";

function EditEquipmentPage ({match}) {
    const editEquipmentID = match.params.ID;
    const EditItemName = useRef('');
    const EditItemCost = useRef('');
    const [isLoading, setisLoading] = useState(false);
    const [originalName,setOriginalName]=useState(null);
    const [originalCost,setOriginalCost] = useState(null);

    function getEditItemInfo () {
        setisLoading(true);
        firebase.db.collection("equipment").doc(editEquipmentID).get()
            .then(doc=>{setOriginalName(doc.data().Name);setOriginalCost(doc.data().Cost)});
        setisLoading(false);
    }

    // eslint-disable-next-line
    useEffect(()=>{getEditItemInfo()},[]);

    function handleEditItemSubmission () {
        const EditItem = {
            Codex: store.getState().codexSelection,
            Name: EditItemName.current,
            Cost: Number(EditItemCost.current)
        };
        firebase.db.collection("equipment").doc(editEquipmentID).set(EditItem);
        window.location.hash = '/equipment/view';
    }

    if (isLoading) { return (<PageLoading />); }

    return (
        <div className="container-fluid p-padding text-center">
            <PageTitle Title="Edit Equipment Page" />
            <form onSubmit={handleEditItemSubmission}>
                <CodexFilter/>
                <div className="row mt-4">
                    <div className="text-warning col-6 text-right">Current Name:</div>
                    <div className="text-white col-6 text-left">{originalName}</div>
                </div>
                <div className="row mt-4">
                    <div className="text-warning col-6 text-right">New Name:</div>
                    <div className="text-white col-6 text-left">
                        <input
                        onChange={e=>EditItemName.current=e.target.value}
                        placeholder="Enter New Name"
                        type="text">
                        </input>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="text-warning col-6 text-right">Current Cost:</div>
                    <div className="text-white col-6 text-left">{originalCost}</div>
                </div>
                <div className="row mt-4">
                    <div className="text-warning col-6 text-right">New Cost:</div>
                    <div className="text-white col-6 text-left">
                        <input
                        onChange={e=>EditItemCost.current=e.target.value}
                        placeholder="Enter New Cost"
                        type="number">
                        </input>
                    </div>
                </div>
                <SubmitButton buttontext={"Save Changes to Equipment"}/>
            </form>
        </div>
    )
}

export default EditEquipmentPage;