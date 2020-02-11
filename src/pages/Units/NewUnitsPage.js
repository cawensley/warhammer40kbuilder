import React from 'react';
import PageTitle from "../../atoms/PageTitle";
import firebase from "firebase/app";
import "firebase/firestore";
import CodexFilter from "../../molecules/CodexFilter";
import SubmitButton from "../../atoms/SubmitButton";
import InputRow from "../../atoms/InputRow";
import SelectArray from "../../molecules/SelectArray";
import store from "../../Redux/store";
import codexFilter from "../../utilities/codexFilter";

function NewUnitsPage () {
    const [newUnit,setNewUnit] = React.useState({Codex: store.getState().codex,Name: '',Cost: '',Abilities:'None',Gear: []});

    function handleNameInput(input) {setNewUnit({...newUnit,Name:input})}
    function handleCostInput(input) {setNewUnit({...newUnit,Cost:+input})}
    function handleAbilitiesInput(input) {setNewUnit({...newUnit,Abilities:input})}
    function handleGearRemove () {var NewGear = newUnit.Gear;NewGear.pop();setNewUnit({...newUnit,Gear:NewGear})}
    function handleGearAdd(input) {var NewGear = newUnit.Gear;NewGear.push(input);setNewUnit({...newUnit,Gear:NewGear})}

    function handleNewUnitSubmission () {
        firebase.firestore().collection("units").add(newUnit);
        window.location.hash = '/units/view';
    }

    // eslint-disable-next-line
    React.useEffect(()=>setNewUnit({...newUnit,Codex:store.getState().codex}),[store.getState().codex]);

    return (
        <div data-test="newUnitsPage" className="container-fluid p-padding text-center">
            <PageTitle Title="New Units Page" />
            <form data-test="submitButton" onSubmit={handleNewUnitSubmission}>
                <CodexFilter/>
                <InputRow type="text" left="New Unit Name:" startValue={newUnit.Name} onInputChange={handleNameInput}/>
                <InputRow type="number" left="New Unit Cost:" startValue={newUnit.Cost} onInputChange={handleCostInput}/>
                <InputRow type="text" left="New Unit Abilities:" startValue={newUnit.Abilities} onInputChange={handleAbilitiesInput}/>
                <SelectArray
                    codexArray={codexFilter(store.getState().equipment)}
                    left="Gear:"
                    onItemAdd={handleGearAdd}
                    onItemRemove={handleGearRemove}
                    arrayDisplay={newUnit.Gear}
                />
                <SubmitButton buttontext="Add Unit to Database"/>
            </form>
        </div>
    )
}

export default NewUnitsPage;