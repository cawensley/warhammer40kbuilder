import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div data-test="Footer" className="bg-secondary fixed-bottom text-center text-primary">
      Copyright &copy; WH40k Army Builder&nbsp;
      {currentYear.toString()}
    </div>
  );
}

export default Footer;
