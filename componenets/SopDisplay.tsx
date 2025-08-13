import React from 'react';

interface SopDisplayProps {
  sopText: string;
  isLoading: boolean;
}

const LoadingSkeleton: React.FC = () => (
    <div className="space-y-6 animate-pulse">
        <div className="h-6 bg-slate-200 rounded w-1/4"></div>
        <div className="space-y-3">
            <div className="h-4 bg-slate-200 rounded w-full"></div>
            <div className="h-4 bg-slate-200 rounded w-5/6"></div>
        </div>
        <div className="h-6 bg-slate-200 rounded w-1/3"></div>
        <div className="space-y-3">
            <div className="h-4 bg-slate-200 rounded w-full"></div>
            <div className="h-4 bg-slate-200 rounded w-full"></div>
            <div className="h-4 bg-slate-200 rounded w-3/4"></div>
            <div className="h-4 bg-slate-200 rounded w-4/5"></div>
        </div>
    </div>
);

const InitialState: React.FC = () => (
    <div className="text-center py-10">
        <div className="text-5xl mb-4 text-slate-300">📄</div>
        <h3 className="text-lg font-semibold text-slate-600">Your SOP will appear here</h3>
        <p className="text-slate-500">Fill out the fields above and click "Generate SOP" to get started.</p>
    </div>
);


export const SopDisplay: React.FC<SopDisplayProps> = ({ sopText, isLoading }) => {
  if (isLoading) {
    return (
      <div className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm min-h-[300px]">
        <LoadingSkeleton />
      </div>
    );
  }

  if (!sopText) {
    return (
       <div className="p-8 bg-white border border-slate-200 rounded-2xl min-h-[200px] flex items-center justify-center">
        <InitialState />
      </div>
    )
  }

  return (
    <div className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm">
      <h2 className="text-2xl font-bold text-slate-800 border-b border-slate-200 pb-4 mb-6">
        Generated Standard Operating Procedure
      </h2>
      <div className="prose prose-slate max-w-none prose-headings:font-semibold prose-h3:text-lg prose-h3:border-b prose-h3:pb-2 prose-h3:border-slate-200">
        <pre className="font-sans whitespace-pre-wrap p-0 bg-transparent">{sopText}</pre>
      </div>
    </div>
  );
};