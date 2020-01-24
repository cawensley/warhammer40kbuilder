import React from 'react';

function SubmitButton ({buttontext}) {
    return (
        <div className="mt-4">
            <button type="submit" className="btn btn-success">{buttontext}</button>
        </div>
    )
}

export default SubmitButton;