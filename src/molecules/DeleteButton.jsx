import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/firestore';
import DeleteModal from '../atoms/DeleteModal';

const DeleteButton = ({ collectionName, uniqueID, uniqueName }) => {
  const [show, setShow] = React.useState(false);

  function DisplayModal() { setShow(true); }
  function CloseModal() { setShow(false); }

  function RemoveItem() {
    setShow(false);
    return firebase.firestore().collection(`${collectionName}`).doc(uniqueID).delete();
  }

  return (
    <>
      <button
        data-test="deleteButton"
        type="submit"
        value="Submit"
        className="btn btn-danger btn-sm m-1"
        onClick={() => DisplayModal()}
      >
        Delete
      </button>
      <DeleteModal show={show} onCancel={CloseModal} onConfirm={RemoveItem} name={uniqueName} />
    </>
  );
};

DeleteButton.propTypes = {
  uniqueID: PropTypes.string,
  uniqueName: PropTypes.string,
  collectionName: PropTypes.string,
};

DeleteButton.defaultProps = {
  uniqueID: null,
  uniqueName: null,
  collectionName: null,
};

export default DeleteButton;
