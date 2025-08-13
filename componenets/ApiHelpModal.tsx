import React from 'react';

interface ApiHelpModalProps {
  onClose: () => void;
}

const HelpSection: React.FC<{ title: string; children: React.ReactNode; }> = ({ title, children }) => (
    <div className="border-t border-slate-200 pt-4 mt-4 first:border-t-0 first:pt-0 first:mt-0">
        <h4 className="font-semibold text-lg text-slate-800 mb-2">{title}</h4>
        <div className="space-y-2 text-slate-600">{children}</div>
    </div>
);

export const ApiHelpModal: React.FC<ApiHelpModalProps> = ({ onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start">
            <h3 className="text-2xl font-bold text-slate-800">How to Get API Keys</h3>
            <button 
              onClick={onClose} 
              className="text-slate-400 hover:text-slate-600 transition-colors"
              aria-label="Close"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
        </div>
        
        <p className="mt-2 text-slate-500">To use this application, you must publish it and provide your own API keys as environment variables. Here’s how to find them for each service.</p>

        <div className="mt-6 space-y-6">
            <HelpSection title="Google Gemini">
                <p>1. Go to the Google AI Studio website.</p>
                <p>2. Sign in with your Google Account.</p>
                <p>3. Click <strong>"Get API key"</strong> and then <strong>"Create API key"</strong>.</p>
                <p>4. Copy the key and use it for the `API_KEY` environment variable.</p>
                <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Go to Google AI Studio &rarr;</a>
            </HelpSection>

            <HelpSection title="Cloudflare AI">
                <p>You need two values: an Account ID and an API Token.</p>
                <p>1. Log in to the Cloudflare Dashboard.</p>
                <p>2. For the <strong>Account ID</strong>: Check the URL in your browser. It will be `dash.cloudflare.com/[Your_Account_ID]`. Copy that ID.</p>
                <p>3. For the <strong>API Token</strong>: Go to My Profile &gt; API Tokens &gt; Create Token. Use the template named <strong>"Edit Cloudflare Workers"</strong>. Create and copy the token.</p>
                <p>4. Use these for the `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN` variables.</p>
                <a href="https://dash.cloudflare.com/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Go to Cloudflare Dashboard &rarr;</a>
            </HelpSection>
            
            <HelpSection title="OpenAI (ChatGPT)">
                <p>1. Go to the OpenAI API keys page.</p>
                <p>2. Sign up or log in to your account.</p>
                <p>3. Click <strong>"Create new secret key"</strong>. The key starts with `sk-`.</p>
                <p>4. Copy the key and use it for the `OPENAI_API_KEY` environment variable.</p>
                <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Go to OpenAI Platform &rarr;</a>
            </HelpSection>

            <HelpSection title="DeepSeek">
                <p>1. Go to the DeepSeek Platform API keys page.</p>
                <p>2. Sign up or log in.</p>
                <p>3. Go to the "API Keys" section and click <strong>"Create new secret key"</strong>.</p>
                <p>4. Copy the key and use it for the `DEEPSEEK_API_KEY` environment variable.</p>
                <a href="https://platform.deepseek.com/api_keys" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Go to DeepSeek Platform &rarr;</a>
            </HelpSection>
        </div>
      </div>
    </div>
  );
};