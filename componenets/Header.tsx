import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="w-full bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 py-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">
          SOP Generator AI
        </h1>
        <p className="mt-2 text-md text-slate-500">
          Instantly create professional Standard Operating Procedures for your business processes.
        </p>
      </div>
    </header>
  );
};