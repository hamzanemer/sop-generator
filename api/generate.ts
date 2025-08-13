import { GoogleGenAI } from "@google/genai";
import { AiService } from '../components/ServiceSelector';

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


async function generateWithGemini(inputs: SopInputs): Promise<string> {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY environment variable not set for Google Gemini");
    }
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
}

async function generateWithCloudflare(inputs: SopInputs): Promise<string> {
    const { CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN } = process.env;
    if (!CLOUDFLARE_ACCOUNT_ID || !CLOUDFLARE_API_TOKEN) {
        throw new Error("Cloudflare environment variables (CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN) are not set.");
    }
    
    const { system_prompt, user_prompt } = getPrompts(inputs);

    const cfResponse = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/meta/llama-3-8b-instruct`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: system_prompt },
            { role: 'user', content: user_prompt }
          ]
        })
      }
    );

    if (!cfResponse.ok) {
        const errorText = await cfResponse.text();
        console.error("Cloudflare AI Error:", errorText);
        throw new Error(`Cloudflare AI request failed with status ${cfResponse.status}`);
    }

    const data = await cfResponse.json() as { result: { response: string } };
    return data.result.response;
}

async function generateWithOpenAI(inputs: SopInputs): Promise<string> {
    const { OPENAI_API_KEY } = process.env;
    if (!OPENAI_API_KEY) {
        throw new Error("OPENAI_API_KEY environment variable is not set.");
    }
    
    const { system_prompt, user_prompt } = getPrompts(inputs);

    const openAIResponse = await fetch("https://api.openai.com/v1/chat/completions", {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
                { role: 'system', content: system_prompt },
                { role: 'user', content: user_prompt }
            ]
        })
    });

    if (!openAIResponse.ok) {
        const errorText = await openAIResponse.text();
        console.error("OpenAI Error:", errorText);
        throw new Error(`OpenAI API request failed with status ${openAIResponse.status}`);
    }

    const data = await openAIResponse.json();
    return data.choices[0].message.content;
}

async function generateWithDeepSeek(inputs: SopInputs): Promise<string> {
    const { DEEPSEEK_API_KEY } = process.env;
    if (!DEEPSEEK_API_KEY) {
        throw new Error("DEEPSEEK_API_KEY environment variable is not set.");
    }
    
    const { system_prompt, user_prompt } = getPrompts(inputs);

    const deepseekResponse = await fetch("https://api.deepseek.com/chat/completions", {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: "deepseek-chat",
            messages: [
                { role: 'system', content: system_prompt },
                { role: 'user', content: user_prompt }
            ]
        })
    });

    if (!deepseekResponse.ok) {
        const errorText = await deepseekResponse.text();
        console.error("DeepSeek Error:", errorText);
        throw new Error(`DeepSeek API request failed with status ${deepseekResponse.status}`);
    }

    const data = await deepseekResponse.json();
    return data.choices[0].message.content;
}


export default async function handler(request: Request) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { service, ...inputs }: SopInputs & { service: AiService } = await request.json();

    if (!inputs.activities) {
        return new Response(JSON.stringify({ error: 'Primary work activities are required.' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    let sopText = '';
    switch (service) {
        case 'cloudflare':
            sopText = await generateWithCloudflare(inputs);
            break;
        case 'chatgpt':
            sopText = await generateWithOpenAI(inputs);
            break;
        case 'deepseek':
            sopText = await generateWithDeepSeek(inputs);
            break;
        case 'gemini':
        default:
            sopText = await generateWithGemini(inputs);
            break;
    }

    return new Response(JSON.stringify({ sop: sopText }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Error in /api/generate:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown server error occurred.";
    return new Response(JSON.stringify({ error: errorMessage }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
    });
  }
}