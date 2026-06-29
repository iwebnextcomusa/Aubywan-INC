import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize the Google GenAI SDK (Server-Side Only)
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (apiKey) {
  aiClient = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
} else {
  console.warn('Warning: GEMINI_API_KEY is not set. The AI chatbot will operate in demo fallback mode.');
}

// System instructions for Construction Aubywan INC helper chatbot
const SYSTEM_INSTRUCTION = `You are "Auby", the virtual construction advisor and AI assistant for Construction Aubywan INC, a premium construction and general contracting company.
Your goal is to build trust, answer customer inquiries professionally, provide high-level estimates, explain construction processes, and help generate qualified leads for a free estimate.

Company Information:
- Company Name: Construction Aubywan INC
- Location: Saint-Eustache, Quebec, Canada (serving Saint-Eustache, Laval, Blainville, Mirabel, Deux-Montagnes, and surrounding North Shore areas).
- Contact Phone: 438-763-4122
- Contact Email: constructionaubywan@gmail.com
- Main offer: We offer free estimates/quotes for all residential and commercial projects.
- Language style: Professional, warm, trustworthy, and expert. You are bilingual and should respond in the language the customer speaks (either Canadian English or French). Since you serve Quebec, French speaking users should be answered with professional Quebec French.

Services We Provide:
1. Residential Construction (Custom homes, additions)
2. Commercial Construction (Offices, commercial spaces, tenant improvements)
3. Renovations (Complete home flips, structural changes)
4. Kitchen Remodeling (Cabinets, countertops, premium upgrades)
5. Bathroom Remodeling (Walk-in showers, custom tiling, plumbing fixtures)
6. Basement Finishing (Drywall, subfloors, media rooms, secondary suites)
7. Framing & Structural (Load bearing wall removals, timber frames)
8. Drywall (Hanging, mudding, taping, high-end plaster finishes)
9. Flooring (Hardwood, engineered, vinyl, ceramic tiling)
10. Roofing (Asphalt shingles, flat roofing, leak repairs)
11. Exterior Renovations (Siding, brick, windows & doors replacements)
12. Decks & Patios (Custom composite/wood structures, pergolas)
13. General Contracting & Project Management (End-to-end supervision, sub-trade coordination)

Frequently Asked Questions Guidance:
- Estimates: Absolutely free. We do site visits in Saint-Eustache and surrounding cities.
- Licensing & Insurance: Yes, we are fully licensed and hold general liability insurance to protect our clients and workers.
- Timelines: Kitchens take 2-4 weeks; bathrooms 1-3 weeks; basements 3-5 weeks; new builds 4-8 months depending on scale.
- Payment Options: Bank transfer, certified check, or structured payment schedule for larger projects (milestone-based payments).
- Warranties: We offer a solid warranty on all our workmanship because we stand behind our quality.

Lead Generation Strategy:
- When answering queries, guide the user towards booking a "Free Estimate" or calling us directly at 438-763-4122.
- Offer to collect their details (Name, Email, Phone, Project Type) if they want us to reach out to them.
- If they ask for precise pricing, explain that custom projects require a site visit or detailed drawings to be exact, and offer a free consultation.

Keep answers concise, beautifully structured, and friendly. Avoid overly long paragraphs. Use lists/bullet points where helpful.`;

// API endpoint for chatbot
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid requests format. "messages" array is required.' });
    }

    // Fallback if API key is not present
    if (!aiClient) {
      const lastMessage = messages[messages.length - 1]?.content || '';
      const dummyResponse = `Hello! Thank you for contacting Construction Aubywan INC in Saint-Eustache. 
      I am currently running in offline demo mode. For real estimates or questions, please contact our team directly at 438-763-4122 or email constructionaubywan@gmail.com! We'll be happy to assist you. 
      (To enable smart AI chat, please configure GEMINI_API_KEY in the Secrets panel)`;
      return res.json({ text: dummyResponse });
    }

    // Convert messages history to content format accepted by GoogleGenAI
    // The SDK expects contents to be either string or array of parts/contents.
    // Let's formulate a prompt combining the history and prompt.
    // Or we can use the chats interface. Let's use chats.create to run a multi-turn chat.
    const lastUserMessage = messages[messages.length - 1]?.content;
    if (!lastUserMessage) {
      return res.status(400).json({ error: 'No user message found.' });
    }

    // Formulate previous messages as history for the chat
    const history = messages.slice(0, -1).map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

    // Start a chat session
    const chat = aiClient.chats.create({
      model: 'gemini-3.5-flash',
      history: history,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const response = await chat.sendMessage({
      message: lastUserMessage,
    });

    const replyText = response.text || "I apologize, but I'm unable to process that request right now. Please feel free to call us at 438-763-4122.";
    return res.json({ text: replyText });

  } catch (error: any) {
    console.error('Gemini API Error:', error);
    return res.status(500).json({ 
      error: 'An error occurred while communicating with the AI service.', 
      details: error.message 
    });
  }
});

// Start server
async function startServer() {
  // Vite dev mode vs production mode
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Vite middleware mounted in development mode.');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('Serving production build from:', distPath);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
