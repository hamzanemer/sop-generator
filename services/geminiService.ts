import { AiService } from '../components/ServiceSelector';

interface SopInputs {
  activities: string;
  interactions: string;
  tools: string;
  details: string;
  lineManagerPosition: string;
  teamSize: string;
}

export async function generateSop(inputs: SopInputs, service: AiService): Promise<string> {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...inputs, service }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.sop;
  } catch (error) {
    console.error("Error generating SOP:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate SOP: ${error.message}`);
    }
    throw new Error("An unknown error occurred while generating the SOP.");
  }
}