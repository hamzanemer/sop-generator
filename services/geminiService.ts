import { GoogleGenAI } from "@google/genai";

interface SopInputs {
  activities: string;
  interactions: string;
  tools: string;
  details: string;
  lineManagerPosition: string;
  teamSize: string;
}

function getPrompts(inputs: SopInputs): { system_prompt: string, user_prompt: string } {
    const system_prompt = `You are an expert in creating professional business documentation. Your task is to generate a detailed Standard Operating Procedure (SOP) based on the user's information. The SOP must be well-structured with a formal tone, clear headings, subheadings, and step-by-step instructions. The output should be clean, well-formatted markdown text.
The structure should include:
1.0 Purpose
2.0 Scope
3.0 Roles and Responsibilities
4.0 Required Tools and Systems
5.0 Procedure
6.0 Key Metrics & Deadlines
7.0 Approvals & Safety Protocols`;

    const user_prompt = `Generate the SOP using this data:
- Primary Work Activities: ${inputs.activities}
- Interactions (Colleagues, Clients, Vendors): ${inputs.interactions || 'Not specified'}
- Line Manager's Position: ${inputs.lineManagerPosition || 'Not specified'}
- Number of employees in team (excluding manager): ${inputs.teamSize || 'Not specified'}
- Systems and Tools Used: ${inputs.tools || 'Not specified'}
- Additional Details (Metrics, KPIs, Safety, Approvals, Deadlines): ${inputs.details || 'Not specified'}`;

    return { system_prompt, user_prompt };
}


export async function generateSop(inputs: SopInputs): Promise<string> {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const { system_prompt, user_prompt } = getPrompts(inputs);
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: user_prompt,
      config: {
        systemInstruction: system_prompt,
      }
    });
    
    return response.text;

  } catch (error) {
    console.error("Error generating SOP:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate SOP: ${error.message}`);
    }
    throw new Error("An unknown error occurred while generating the SOP.");
  }
}
