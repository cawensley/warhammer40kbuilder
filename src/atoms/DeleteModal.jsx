import React from 'react';
import PropTypes from 'prop-types';
import './DeleteModal.scss';

const DeleteModal = ({
  show, name, onCancel, onConfirm,
}) => {
  if (!show) { return null; }

  return (
    <div data-test="deleteModal" className="container d-flex flex-wrap w-50 h-50 bg-secondary align-items-center justify-content-center a-DeleteModal-position border border-danger">
      <div className="text-white py-3">
        Are you sure you want to delete&nbsp;
        <strong className="text-dark"><i><u>{name}</u></i></strong>
        ?
      </div>
      <div className="text-center">
        <button data-test="deleteButton" type="button" className="btn btn-danger m-2" onClick={() => onConfirm()}>Yes, Delete!</button>
        <button data-test="cancelButton" type="button" className="btn btn-success m-2" onClick={() => onCancel()}>Cancel</button>
      </div>
    </div>
  );
};

export default DeleteModal;

DeleteModal.propTypes = {
  show: PropTypes.bool,
  name: PropTypes.string,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
};

DeleteModal.defaultProps = {
  show: null,
  name: null,
  onCancel: null,
  onConfirm: null,
};
