import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/firestore';

const DeleteButton = ({ collectionName, uniqueID }) => {
  function RemoveItem() {
    return firebase.firestore().collection(`${collectionName}`).doc(uniqueID).delete();
  }

  return (
    <button
      data-test="deleteButton"
      type="submit"
      value="Submit"
      className="btn btn-danger btn-sm"
      onClick={() => RemoveItem()}
    >
      Delete
    </button>
  );
};

DeleteButton.propTypes = {
  uniqueID: PropTypes.string,
  collectionName: PropTypes.string,
};

DeleteButton.defaultProps = {
  uniqueID: null,
  collectionName: null,
};

export default DeleteButton;
