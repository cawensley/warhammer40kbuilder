import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear().toString();

  return (
    <div data-test="Footer" className="bg-secondary fixed-bottom text-center text-primary">
      Copyright &copy; warhammer40kbuilder.info&nbsp;
      {currentYear}
    </div>
  );
};

export default Footer;
