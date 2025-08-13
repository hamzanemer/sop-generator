import React from 'react';
import type { AiService } from './ServiceSelector';

interface FooterProps {
  selectedService: AiService;
}

export const Footer: React.FC<FooterProps> = ({ selectedService }) => {
  const getServiceName = () => {
    switch (selectedService) {
      case 'gemini':
        return 'Google Gemini';
      case 'cloudflare':
        return 'Cloudflare AI (Llama 3)';
      case 'chatgpt':
        return 'OpenAI (ChatGPT)';
      case 'deepseek':
        return 'DeepSeek';
      default:
        return 'Generative AI';
    }
  };

  return (
    <footer className="w-full mt-auto">
      <div className="max-w-4xl mx-auto px-4 py-4 text-center">
        <p className="text-sm text-slate-500">
          Powered by {getServiceName()}
        </p>
      </div>
    </footer>
  );
};