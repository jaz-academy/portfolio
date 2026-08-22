import { streamText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { getSystemPrompt } from "@/utils/prompt";

// Konfigurasi provider Google Gemini
const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY || "",
});

// Waktu maksimal untuk request di Edge/Serverless Next.js
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Konversi UIMessage dari client ke CoreMessage untuk streamText
    const coreMessages = messages.map((m: any) => ({
      role: m.role === 'user' || m.role === 'assistant' || m.role === 'system' ? m.role : 'user',
      content: m.content || m.text || (m.parts ? m.parts.map((p: any) => p.text).join('') : '') || ''
    }));

    // Ambil system prompt dinamis dari Supabase
    const systemPrompt = await getSystemPrompt();

    // Lakukan pemanggilan LLM dengan Gemini
    const result = streamText({
      model: google('gemini-3.6-flash'),
      system: systemPrompt,
      messages: coreMessages,
      temperature: 0.7, // Kreativitas standar
    });

    // Pada Vercel AI SDK v4 / ai v7.x, kita menggunakan toUIMessageStreamResponse
    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response(JSON.stringify({ error: "Failed to process chat" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
