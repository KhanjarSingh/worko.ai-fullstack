import React from 'react';

const Card = ({ children, className = '' }) => {
    return (
        <div className={`bg-white shadow-lg shadow-slate-200/50 rounded-xl p-6 border border-slate-100 transition-all ${className}`}>
            {children}
        </div>
    );
};

export default Card;
