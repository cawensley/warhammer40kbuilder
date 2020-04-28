import React from 'react';
import PropTypes from 'prop-types';
import store from '../Redux/store';
import RoleChange from '../Redux/actions/RoleChange/RoleChange';

const RoleRow = ({ left }) => (
  <div data-test="RoleRow" className="row mt-4">
    <div className="text-warning col-4 col-md-6 text-right">{left}</div>
    <div className="col-8 col-md-6 text-left">
      <select
        data-test="RoleRowSelect"
        id="Role"
        className="bg-white"
        value={store.getState().role}
        onChange={(event) => store.dispatch(RoleChange(event.target.value))}
      >
        {store.getState().roles.map((choice) => (
          <option key={choice.id} value={choice.id}>{choice.Name}</option>
        ))}
      </select>
    </div>
  </div>
);

RoleRow.propTypes = {
  left: PropTypes.string,
};

RoleRow.defaultProps = {
  left: null,
};

export default RoleRow;
