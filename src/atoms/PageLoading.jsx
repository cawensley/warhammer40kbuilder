import React from 'react';

function PageLoading() {
  return (
    <p className="container-fluid p-padding text-center text-white" data-test="loadingSpinCog">
      <i className="fas fa-5x fa-cog fa-spin" />
    </p>
  );
}

export default PageLoading;
