import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || !body.message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const { message, language = 'en' } = body;
    const apiKey = process.env.GROQ_API_KEY?.trim();

    if (!apiKey) {
      console.error("GROQ_API_KEY is not defined in environment variables!");
      return NextResponse.json({ 
        reply: "Server configuration notice: GROQ_API_KEY is missing. Please add it to your environment variables." 
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
Do not use markdown symbols like asterisks (*), hashtags (#), or bullets, so it can be read smoothly by text-to-speech engines.`;

    // llama-3.1-8b-instant is globally active on all Groq tiers
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        temperature: 0.6,
        max_tokens: 300
      })
    });

    const data = await groqResponse.json();

    if (!groqResponse.ok || data.error) {
      console.error("Groq API response error:", data.error || data);
      return NextResponse.json({ 
        reply: `AI service notice: ${data.error?.message || 'Check Groq API model'}` 
      }, { status: groqResponse.status || 500 });
    }

    const reply = data.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return NextResponse.json({ 
        reply: "Bhoomi AI could not generate an answer for this prompt. Please rephrase your query." 
      }, { status: 502 });
    }

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("Server catch in /api/bhoomi:", error);
    return NextResponse.json({ 
      reply: `Connection error: ${error.message || 'Unable to reach Bhoomi AI service'}` 
    }, { status: 500 });
  }
}