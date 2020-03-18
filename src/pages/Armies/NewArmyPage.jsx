import React from 'react';
import PageTitle from '../../atoms/PageTitle';
import CodexFilter from '../../molecules/CodexFilter';
import TextInputRow from '../../atoms/TextInputRow';
import PointsRow from '../../atoms/PointsRow';
import SquadRow from '../../organisms/SquadRow';
import store from '../../Redux/store';
import ArmyNameChange from '../../Redux/actions/ArmyNameChange';
import SubmitButton from '../../atoms/SubmitButton';
import handleArmySubmission from '../../utilities/handleArmySubmission';
import handleInitialArmy from '../../utilities/handleInitialArmy';

function NewArmyPage() {
  function handleNameInput(input) { store.dispatch(ArmyNameChange(input)); }

  // eslint-disable-next-line
  React.useEffect(() => {handleInitialArmy()}, []);

  return (
    <div data-test="NewArmyPage" className="container-fluid p-padding text-center">
      <PageTitle Title="New Armies Page" />
      <form data-test="submitButton" onSubmit={() => handleArmySubmission('Add')}>
        <CodexFilter />
        <TextInputRow type="text" left="Army Name:" startValue={store.getState().army.Name} onInputChange={handleNameInput} />
        <PointsRow />
        <SubmitButton buttontext="Add Army to Profile" />
        {store.getState().army.SquadArray.map(
          (row, index) => <SquadRow key={index} roleIndex={index} />,
        )}
        <SubmitButton buttontext="Add Army to Profile" />
      </form>
    </div>
  );
}

export default NewArmyPage;
