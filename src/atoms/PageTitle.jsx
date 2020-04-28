import React from 'react';
import PropTypes from 'prop-types';

const PageTitle = ({ Title }) => (
  <h2 className="text-white text-center pb-1" data-test="component-Title"><u>{Title}</u></h2>
);

PageTitle.propTypes = {
  Title: PropTypes.string,
};

PageTitle.defaultProps = {
  Title: null,
};

export default PageTitle;
