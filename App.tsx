import React, { useState, useCallback } from 'react';
import { generateSop } from './services/geminiService';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LabeledTextarea } from './components/LabeledTextarea';
import { SopDisplay } from './components/SopDisplay';
import { GenerateButton } from './components/GenerateButton';
import { LabeledInput } from './components/LabeledInput';
import { ServiceSelector, AiService } from './components/ServiceSelector';
import { ApiHelpModal } from './components/ApiHelpModal';

function App() {
  const [activities, setActivities] = useState('');
  const [interactions, setInteractions] = useState('');
  const [tools, setTools] = useState('');
  const [lineManagerPosition, setLineManagerPosition] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [details, setDetails] = useState('');

  const [generatedSop, setGeneratedSop] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<AiService>('gemini');
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  const handleGenerateSop = useCallback(async () => {
    if (!activities.trim()) {
      setError('"Primary work activities" field cannot be empty.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedSop('');

    try {
      const result = await generateSop({ activities, interactions, tools, details, lineManagerPosition, teamSize }, selectedService);
      setGeneratedSop(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [activities, interactions, tools, details, lineManagerPosition, teamSize, selectedService]);

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-800">
      <Header />
      <main className="flex-grow w-full max-w-4xl mx-auto px-4 py-8 md:py-12">
        <div className="space-y-8">
          <div className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <LabeledTextarea
                id="activities"
                label="What are your primary work activities?"
                value={activities}
                onChange={(e) => setActivities(e.target.value)}
                placeholder="e.g., Processing customer orders, managing inventory, preparing financial reports..."
                required
              />
              <LabeledTextarea
                id="interactions"
                label="Who do you interact with?"
                value={interactions}
                onChange={(e) => setInteractions(e.target.value)}
                placeholder="e.g., Colleagues in sales, clients via email, shipping vendors..."
              />
              <LabeledTextarea
                id="tools"
                label="What systems or tools do you use?"
                value={tools}
                onChange={(e) => setTools(e.target.value)}
                placeholder="e.g., Salesforce CRM, Microsoft Excel, Slack for team communication..."
              />
              <LabeledInput
                id="lineManager"
                label="What is the position of your line manager?"
                value={lineManagerPosition}
                onChange={(e) => setLineManagerPosition(e.target.value)}
                placeholder="e.g., Head of Sales, Operations Supervisor..."
              />
               <LabeledInput
                id="teamSize"
                label="Number of employees in your team (excluding manager)?"
                type="number"
                value={teamSize}
                onChange={(e) => setTeamSize(e.target.value)}
                placeholder="e.g., 5"
                min="0"
              />
              <div className="md:col-span-2">
                <LabeledTextarea
                  id="details"
                  label="Add any other necessary details (Optional)"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="e.g., Orders must be processed within 24 hours, all reports require manager approval..."
                />
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col items-center gap-6">
              <ServiceSelector selectedService={selectedService} onSelectService={setSelectedService} />
              <GenerateButton 
                isLoading={isLoading} 
                onClick={handleGenerateSop} 
                disabled={!activities.trim()}
              />
              {error && <p className="mt-4 text-sm text-red-600 bg-red-100 border border-red-200 rounded-md px-4 py-2">{error}</p>}
            </div>
          </div>
          
          <SopDisplay sopText={generatedSop} isLoading={isLoading} />
        </div>
        <div className="text-center mt-8">
            <button onClick={() => setIsHelpModalOpen(true)} className="text-sm text-indigo-600 hover:text-indigo-800 underline">
                Where do I find the API Keys?
            </button>
        </div>
      </main>
      <Footer selectedService={selectedService} />
      {isHelpModalOpen && <ApiHelpModal onClose={() => setIsHelpModalOpen(false)} />}
    </div>
  );
}

export default App;