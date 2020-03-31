import React from 'react';
import firebase from 'firebase/app';
import PageTitle from '../../atoms/PageTitle';
import 'firebase/firestore';
import CodexFilter from '../../molecules/CodexFilter';
import SubmitButton from '../../atoms/SubmitButton';
import TextInputRow from '../../atoms/TextInputRow';
import SelectArray from '../../molecules/SelectArray';
import store from '../../Redux/store';
import codexFilter from '../../utilities/codexFilter';
import NumberInputRow from '../../atoms/NumberInputRow';

const NewUnitsPage = () => {
  const [newUnit, setNewUnit] = React.useState({
    Codex: store.getState().codex, Name: '', Cost: 0, Abilities: 'None', Gear: [],
  });

  function handleNameInput(input) { setNewUnit({ ...newUnit, Name: input }); }
  function handleCostInput(input) { setNewUnit({ ...newUnit, Cost: +input }); }
  function handleAbilitiesInput(input) { setNewUnit({ ...newUnit, Abilities: input }); }
  function handleGearRemove() {
    const NewGear = newUnit.Gear;
    NewGear.pop();
    setNewUnit({ ...newUnit, Gear: NewGear });
  }
  function handleGearAdd(input) {
    const NewGear = newUnit.Gear;
    NewGear.push(input);
    setNewUnit({ ...newUnit, Gear: NewGear });
  }
  function handleNewUnitSubmission() {
    firebase.firestore().collection('units').add(newUnit);
    window.location.hash = '/units/view';
  }

  // eslint-disable-next-line
    React.useEffect(()=>setNewUnit({...newUnit,Codex:store.getState().codex}),[store.getState().codex]);

  return (
    <div data-test="newUnitsPage" className="container-fluid p-padding text-center">
      <PageTitle Title="New Units Page" />
      <form data-test="submitButton" onSubmit={handleNewUnitSubmission}>
        <CodexFilter />
        <TextInputRow type="text" left="New Unit Name:" startValue={newUnit.Name} onInputChange={handleNameInput} />
        <NumberInputRow left="New Unit Cost:" startValue={newUnit.Cost} onInputChange={handleCostInput} />
        <TextInputRow type="text" left="New Unit Abilities:" startValue={newUnit.Abilities} onInputChange={handleAbilitiesInput} />
        <SelectArray
          codexArray={codexFilter(store.getState().equipment)}
          left="Gear:"
          onItemAdd={handleGearAdd}
          onItemRemove={handleGearRemove}
          arrayDisplay={newUnit.Gear}
        />
        <SubmitButton buttontext="Add Unit to Database" />
      </form>
    </div>
  );
};

export default NewUnitsPage;
