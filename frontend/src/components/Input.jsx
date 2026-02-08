import React from 'react';

const Input = ({ label, id, type = 'text', error, className = '', ...props }) => (
    <div className={`mb-5 ${className}`}>
        {label && <label htmlFor={id} className="block text-sm font-semibold text-[#162c44] mb-2">{label}</label>}
        <input
            id={id}
            type={type}
            className={`w-full px-4 py-3 bg-slate-50 border rounded-xl shadow-sm transition-all focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#162c44]/20 focus:border-[#162c44] text-slate-800 placeholder:text-slate-400 ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-200 hover:border-[#162c44]/30'
                }`}
            {...props}
        />
        {error && <p className="mt-1 text-sm text-red-600 font-medium">{error}</p>}
    </div>
);

export default Input;
