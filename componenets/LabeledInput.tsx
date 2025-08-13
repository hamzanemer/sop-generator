import React from 'react';

interface LabeledInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
  type?: string;
  min?: string;
}

export const LabeledInput: React.FC<LabeledInputProps> = ({ id, label, value, onChange, placeholder, required = false, type = 'text', min }) => {
  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={id} className="font-semibold text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        className="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
      />
    </div>
  );
};