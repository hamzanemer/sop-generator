import React from 'react';

const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm6 2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1V4zm3 5a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1V9a1 1 0 011-1z" clipRule="evenodd" />
    <path d="M3 10a1 1 0 011-1h1a1 1 0 110 2H4a1 1 0 01-1-1zM2 5a1 1 0 011-1h1a1 1 0 110 2H3a1 1 0 01-1-1zM10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zM9 9a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM17 5a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1z" />
  </svg>
);

const LoadingSpinner = () => (
  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

interface GenerateButtonProps {
    isLoading: boolean;
    onClick: () => void;
    disabled: boolean;
}

export const GenerateButton: React.FC<GenerateButtonProps> = ({ isLoading, onClick, disabled }) => {
    const isDisabled = isLoading || disabled;

    return (
        <button
            onClick={onClick}
            disabled={isDisabled}
            className={`
                inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white rounded-full transition-all duration-200
                ${isDisabled 
                    ? 'bg-indigo-300 cursor-not-allowed' 
                    : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50'
                }
            `}
        >
            {isLoading ? <LoadingSpinner /> : <SparklesIcon />}
            <span>{isLoading ? 'Generating...' : 'Generate SOP'}</span>
        </button>
    );
};
