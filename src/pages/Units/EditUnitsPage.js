import React, {useContext, useEffect, useState} from 'react';
import PageTitle from "../../atoms/PageTitle";
import CodexFilter from "../../molecules/CodexFilter";
import firebase from "../../firebase/firebase";
import PageLoading from "../../atoms/PageLoading";
import SubmitButton from "../../atoms/SubmitButton";
import TextRow from "../../atoms/TextRow";
import InputRow from "../../atoms/InputRow";
import SelectArray from "../../molecules/SelectArray";
import FirebaseContext from "../../firebase/FirebaseContext";

function EditUnitsPage ({match}) {
    const editUnitID = match.params.ID;
    const {codex,codexEquipment}=useContext(FirebaseContext);
    const [isLoading, setisLoading] = useState(false);
    const [originalUnit,setOriginalUnit]=useState({Name: null,Cost: null});
    const [editUnit,setEditUnit] = useState({Codex: codex,Name: null,Cost: null,Gear: []});

    function handleNameInput(input) {setEditUnit({...editUnit,Name:input})}
    function handleCostInput(input) {setEditUnit({...editUnit,Cost:+input})}
    function handleGearRemove () {var NewGear = editUnit.Gear;NewGear.pop();setEditUnit({...editUnit,Gear:NewGear})}
    function handleGearAdd(input) {var NewGear = editUnit.Gear;NewGear.push(input);setEditUnit({...editUnit,Gear:NewGear})}

    function getEditItemInfo () {
        setisLoading(true);
        firebase.db.collection("units").doc(editUnitID).get()
            .then(doc=>{
                setOriginalUnit({Name: doc.data().Name,Cost: doc.data().Cost});
                setEditUnit({...editUnit,Gear:doc.data().Gear});
            });
        setisLoading(false);
    }

    // eslint-disable-next-line
    useEffect(()=>{getEditItemInfo()},[]);
    // eslint-disable-next-line
    useEffect(()=>setEditUnit({...editUnit,Codex:codex}),[codex]);

    function handleEditUnitSubmission () {
        firebase.db.collection("units").doc(editUnitID).set(editUnit);
        window.location.hash = '/units/view';
    }

    if (isLoading) { return (<PageLoading />); }

    return (
        <div className="container-fluid p-padding text-center">
            <PageTitle Title="Edit Units Page" />
            <form onSubmit={handleEditUnitSubmission}>
                <CodexFilter/>
                <TextRow left="Current Name:" right={originalUnit.Name}/>
                <InputRow type="text" left="New Unit Name:" onInputChange={handleNameInput}/>
                <TextRow left="Current Cost:" right={originalUnit.Cost}/>
                <InputRow type="number" left="New Unit Cost:" onInputChange={handleCostInput}/>
                <SelectArray
                    codexArray={codexEquipment}
                    left="Gear:"
                    onItemAdd={handleGearAdd}
                    onItemRemove={handleGearRemove}
                    arrayDisplay={editUnit.Gear}
                />
                <SubmitButton buttontext={"Save Changes to Unit"}/>
            </form>
        </div>
    )
}

export default EditUnitsPage;