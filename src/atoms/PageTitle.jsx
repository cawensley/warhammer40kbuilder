import React from 'react';
import PropTypes from 'prop-types';

const PageTitle = ({ Title }) => (
  <h1 className="text-white pb-3" data-test="component-Title"><u>{Title}</u></h1>
);

PageTitle.propTypes = {
  Title: PropTypes.string,
};

PageTitle.defaultProps = {
  Title: null,
};

export default PageTitle;
