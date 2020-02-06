import React, {useEffect, useState} from 'react';
import PageTitle from "../../atoms/PageTitle";
import CodexFilter from "../../molecules/CodexFilter";
import firebase from "../../firebase/firebase";
import PageLoading from "../../atoms/PageLoading";
import SubmitButton from "../../atoms/SubmitButton";
import InputRow from "../../atoms/InputRow";
import SelectArray from "../../molecules/SelectArray";
import store from "../../Redux/store";
import codexFilter from "../../utilities/codexFilter";

function EditUnitsPage ({match}) {
    const editUnitID = match.params.ID;
    const [isLoading, setisLoading] = useState(false);
    const [editUnit,setEditUnit] = useState({Codex: store.getState().codex,Name: '',Cost: '',Abilities:'',Gear: []});

    function handleNameInput(input) {setEditUnit({...editUnit,Name:input})}
    function handleCostInput(input) {setEditUnit({...editUnit,Cost:+input})}
    function handleAbilitiesInput(input) {setEditUnit({...editUnit,Abilities:input})}
    function handleGearRemove () {var NewGear = editUnit.Gear;NewGear.pop();setEditUnit({...editUnit,Gear:NewGear})}
    function handleGearAdd(input) {var NewGear = editUnit.Gear;NewGear.push(input);setEditUnit({...editUnit,Gear:NewGear})}

    function getEditItemInfo () {
        setisLoading(true);
        firebase.db.collection("units").doc(editUnitID).get()
            .then(doc=>{
                setEditUnit({...editUnit,
                    Name:doc.data().Name,
                    Cost:doc.data().Cost,
                    Abilities:doc.data().Abilities,
                    Gear:doc.data().Gear});
            });
        setisLoading(false);
    }

    // eslint-disable-next-line
    useEffect(()=>{getEditItemInfo()},[]);
    // eslint-disable-next-line
    useEffect(()=>setEditUnit({...editUnit,Codex:store.getState().codex}),[store.getState().codex]);

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
                <InputRow type="text" left="Edit Unit Name:" startValue={editUnit.Name} onInputChange={handleNameInput}/>
                <InputRow type="number" left="Edit Unit Cost:" startValue={editUnit.Cost} onInputChange={handleCostInput}/>
                <InputRow type="text" left="Edit Unit Abilities:" startValue={editUnit.Abilities} onInputChange={handleAbilitiesInput}/>

                <SelectArray
                    codexArray={codexFilter(store.getState().equipment)}
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