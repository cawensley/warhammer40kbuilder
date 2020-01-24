import React from 'react';

const Footer = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    return (
        <div className="bg-secondary fixed-bottom text-center text-primary">
            Copyright &copy; WH40k Army Builder&nbsp;{currentYear.toString()}
        </div>
    );
};

export default Footer;