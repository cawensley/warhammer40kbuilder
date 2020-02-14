import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import PageTitle from '../../atoms/PageTitle';
import CodexFilter from '../../molecules/CodexFilter';
import 'firebase/firestore';
import PageLoading from '../../atoms/PageLoading';
import SubmitButton from '../../atoms/SubmitButton';
import InputRow from '../../atoms/InputRow';
import store from '../../Redux/store';

function EditEquipmentPage({ match }) {
  const editEquipmentID = match.params.ID;
  const [state, setState] = React.useState({ isLoading: false, Equipment: { Codex: store.getState().codex, Name: '', Cost: '' } });

  function handleNameInput(input) {
    setState({ ...state, Equipment: { ...state.Equipment, Name: input } });
  }
  function handleCostInput(input) {
    setState({ ...state, Equipment: { ...state.Equipment, Cost: +input } });
  }

  function getEditItemInfo() {
    setState({ ...state, isLoading: true });
    firebase.firestore().collection('equipment').doc(editEquipmentID).get()
      .then((doc) => {
        setState({
          ...state,
          Equipment: {
            ...state.Equipment,
            Name: doc.data().Name,
            Cost: doc.data().Cost,
          },
        });
      });
    setState({ ...state, isLoading: false });
  }

  // eslint-disable-next-line
    React.useEffect(()=>{getEditItemInfo()},[]);
  // eslint-disable-next-line
    React.useEffect(()=>{setState({...state,Equipment:{...state.Equipment,Codex:store.getState().codex}})},[store.getState().codex]);

  function handleEditItemSubmission() {
    firebase.firestore().collection('equipment').doc(editEquipmentID).set(state.Equipment);
    window.location.hash = '/equipment/view';
  }

  if (state.isLoading) { return (<PageLoading />); }

  return (
    <div data-test="editEquipmentPage" className="container-fluid p-padding text-center">
      <PageTitle Title="Edit Equipment Page" />
      <form data-test="submitButton" onSubmit={handleEditItemSubmission}>
        <CodexFilter />
        <InputRow type="text" left="Edit Equipment Name:" startValue={state.Equipment.Name} onInputChange={handleNameInput} />
        <InputRow type="number" left="Edit Equipment Cost:" startValue={state.Equipment.Cost} onInputChange={handleCostInput} />
        <SubmitButton buttontext="Save Changes to Equipment" />
      </form>
    </div>
  );
}

EditEquipmentPage.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    url: PropTypes.string,
    isExact: PropTypes.bool,
    params: PropTypes.shape({
      ID: PropTypes.string,
    }),
  }),
};

EditEquipmentPage.defaultProps = {
  match: null,
};

export default EditEquipmentPage;
