import React from 'react';
import PropTypes from 'prop-types';

function PageTitle ({ Title }) {
    return <h1 className="text-white pb-3" data-test="component-Title"><u>{Title}</u></h1>
}

PageTitle.propTypes = {
    Title: PropTypes.string,
};

PageTitle.defaultProps = {
    Title: null,
};

export default PageTitle;