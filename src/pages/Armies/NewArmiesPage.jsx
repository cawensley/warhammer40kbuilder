import React from 'react';
import PageTitle from '../../atoms/PageTitle';
import CodexFilter from '../../molecules/CodexFilter';

function NewArmiesPage() {
  return (
    <div data-test="NewArmiesPage" className="container-fluid p-padding text-center">
      <PageTitle Title="New Armies Page" />
      <CodexFilter />
    </div>
  );
}

export default NewArmiesPage;
