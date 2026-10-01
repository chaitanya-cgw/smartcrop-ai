import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { message, language = 'en' } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const apiKey = process.env.GROQ_API_KEY?.trim();

    if (!apiKey) {
      return NextResponse.json({ 
        reply: "GROQ_API_KEY is missing in environment variables. Please configure it in .env.local and Vercel." 
      }, { status: 500 });
    }

    const languageMap: Record<string, string> = {
      te: 'Telugu (తెలుగు)',
      hi: 'Hindi (हिन्दी)',
      ta: 'Tamil (தமிழ்)',
      en: 'Indian English'
    };

    const targetLanguage = languageMap[language] || 'Indian English';

    const systemPrompt = `You are Bhoomi AI, an agronomy consultant and agricultural market advisor on the AgriLock platform.
Answer the farmer's question directly, accurately, and practically in ${targetLanguage}.
Provide real, context-specific agronomy or market advice based on what was asked.
Keep your response concise (2 to 4 sentences).
Do not use markdown symbols like asterisks (*), hashtags (#), or bullets, so it can be read smoothly by text-to-speech.`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        temperature: 0.6,
        max_tokens: 300
      })
    });

    const data = await response.json();

    if (!response.ok || data.error) {
      console.error("Groq API Error:", data.error || data);
      return NextResponse.json({ 
        reply: `Groq Error: ${data.error?.message || 'Check API key or connection'}` 
      }, { status: 500 });
    }

    const reply = data.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return NextResponse.json({ 
        reply: "Bhoomi AI could not process this prompt. Please try again." 
      }, { status: 502 });
    }

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("Bhoomi Route Error:", error);
    return NextResponse.json({ 
      reply: `Server error: ${error.message || 'Unable to connect to Bhoomi AI'}` 
    }, { status: 500 });
  }
}