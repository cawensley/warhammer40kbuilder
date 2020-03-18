import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import PageTitle from '../../atoms/PageTitle';
import store from '../../Redux/store';
import PageLoading from '../../atoms/PageLoading';
import ArmyNameChange from '../../Redux/actions/ArmyNameChange';
import ArmySquadChange from '../../Redux/actions/ArmySquadChange';
import TextInputRow from '../../atoms/TextInputRow';
import PointsRow from '../../atoms/PointsRow';
import SubmitButton from '../../atoms/SubmitButton';
import SquadRow from '../../organisms/SquadRow';
import 'firebase/firestore';
import handleArmySubmission from '../../utilities/handleArmySubmission';
import CodexChange from '../../Redux/actions/CodexChange';

function EditArmyPage({ match }) {
  const editArmyID = match.params.ID;
  const [isLoading, setisLoading] = React.useState(false);

  function handleNameInput(input) { store.dispatch(ArmyNameChange(input)); }

  function getEditArmyInfo() {
    setisLoading(true);
    firebase.firestore().collection('armies').doc(editArmyID).get()
      .then((doc) => {
        store.dispatch(ArmySquadChange(doc.data().SquadArray));
        store.dispatch(ArmyNameChange(doc.data().Name));
        for (let i = 0; i < doc.data().SquadArray.length; i += 1) {
          if (doc.data().SquadArray[i].Squads.length > 0) {
            const firstSquad = doc.data().SquadArray[i].Squads[0].Squad;
            const armyCodex = store.getState().squads
              .filter((squad) => squad.id === firstSquad)[0].Codex;
            store.dispatch(CodexChange(armyCodex));
            break;
          }
        }
      });
    setisLoading(false);
  }

  // eslint-disable-next-line
  React.useEffect(()=>{getEditArmyInfo()},[]);

  return (isLoading) ? <PageLoading /> : (
    <div data-test="EditArmyPage" className="container-fluid p-padding text-center">
      <PageTitle Title="Edit Army Page" />
      <form data-test="submitButton" onSubmit={() => handleArmySubmission(editArmyID)}>
        <TextInputRow type="text" left="Army Name:" startValue={store.getState().army.Name} onInputChange={handleNameInput} />
        <PointsRow />
        <SubmitButton buttontext="Save Changes to Army" />
        {store.getState().army.SquadArray.map(
          (row, index) => <SquadRow key={index} roleIndex={index} />,
        )}
        <SubmitButton buttontext="Save Changes to Army" />
      </form>
    </div>
  );
}

EditArmyPage.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    url: PropTypes.string,
    isExact: PropTypes.bool,
    params: PropTypes.shape({
      ID: PropTypes.string,
    }),
  }),
};

EditArmyPage.defaultProps = {
  match: null,
};

export default EditArmyPage;
