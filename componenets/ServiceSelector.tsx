import React from 'react';

export type AiService = 'gemini' | 'cloudflare' | 'chatgpt' | 'deepseek';

interface ServiceButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

const ServiceButton: React.FC<ServiceButtonProps> = ({ label, isSelected, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-semibold border rounded-md transition-colors duration-150 ${
      isSelected
        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
        : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
    }`}
  >
    {label}
  </button>
);

interface ServiceSelectorProps {
  selectedService: AiService;
  onSelectService: (service: AiService) => void;
}

export const ServiceSelector: React.FC<ServiceSelectorProps> = ({ selectedService, onSelectService }) => {
  return (
    <div className="flex flex-col items-center space-y-3">
      <label className="text-sm font-medium text-slate-600">Choose AI Service</label>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <ServiceButton
          label="Google Gemini"
          isSelected={selectedService === 'gemini'}
          onClick={() => onSelectService('gemini')}
        />
        <ServiceButton
          label="Cloudflare AI (Llama 3)"
          isSelected={selectedService === 'cloudflare'}
          onClick={() => onSelectService('cloudflare')}
        />
        <ServiceButton
          label="OpenAI (ChatGPT)"
          isSelected={selectedService === 'chatgpt'}
          onClick={() => onSelectService('chatgpt')}
        />
        <ServiceButton
          label="DeepSeek"
          isSelected={selectedService === 'deepseek'}
          onClick={() => onSelectService('deepseek')}
        />
      </div>
    </div>
  );
};
