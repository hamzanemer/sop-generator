import React from 'react';

interface LabeledTextareaProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  required?: boolean;
}

export const LabeledTextarea: React.FC<LabeledTextareaProps> = ({ id, label, value, onChange, placeholder, required = false }) => {
  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={id} className="font-semibold text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={5}
        className="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out resize-y"
      />
    </div>
  );
};