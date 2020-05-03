import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import store from '../Redux/store';

const DisplayLink = ({
  columns, leftText, rightText, linkID, userID,
}) => {
  if (userID === store.getState().user.uid || userID === '99999') {
    return (
      <div className={`col-md-${columns} d-flex d-inline-block justify-content-md-center`}>
        <div className="d-md-none text-warning">
          {leftText}
          :&nbsp;
        </div>
        <Link
          to={linkID}
          className="p-hyperlink-color"
        >
          {rightText}
        </Link>
      </div>
    );
  }

  return (
    <div className={`col-md-${columns} d-flex d-inline-block justify-content-md-center`}>
      <div className="d-md-none text-warning">
        {leftText}
        :&nbsp;
      </div>
      <div>{rightText}</div>
    </div>
  );
};

DisplayLink.propTypes = {
  columns: PropTypes.number,
  leftText: PropTypes.string,
  rightText: PropTypes.string,
  linkID: PropTypes.string,
  userID: PropTypes.string,
};

DisplayLink.defaultProps = {
  columns: null,
  leftText: null,
  rightText: null,
  linkID: null,
  userID: null,

};

export default DisplayLink;
