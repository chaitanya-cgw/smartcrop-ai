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

    const systemPrompt = `You are Bhoomi AI, an elite agronomy consultant and agricultural market advisor on the AgriLock platform.
Answer the farmer's question directly, accurately, and practically in ${targetLanguage}.
Provide real, context-specific agronomy or market advice based on what was asked.
Keep your response concise (2 to 4 sentences).
Do not use markdown symbols like asterisks (*), hashtags (#), or bullets, so it can be read smoothly by text-to-speech engines.`;

    // Active production models on Groq's tier:
    // 1. llama-3.1-8b-instant (Fastest, ultra-reliable)
    // 2. llama3-70b-8192 (High intelligence backup)
    const availableModels = ['llama-3.1-8b-instant', 'llama3-70b-8192'];

    let generatedReply: string | null = null;
    let lastError: any = null;

    for (const model of availableModels) {
      try {
        const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model,
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: message }
            ],
            temperature: 0.6,
            max_tokens: 300
          })
        });

        const data = await groqResponse.json();

        if (groqResponse.ok && data.choices?.[0]?.message?.content) {
          generatedReply = data.choices[0].message.content.trim();
          break; // Successfully got response
        } else {
          lastError = data.error?.message || `Failed on model ${model}`;
          console.warn(`Groq error on ${model}:`, lastError);
        }
      } catch (e: any) {
        lastError = e.message;
      }
    }

    if (generatedReply) {
      return NextResponse.json({ reply: generatedReply });
    }

    return NextResponse.json({ 
      reply: `AI service notice: ${lastError || 'Unable to generate response from Groq models.'}` 
    }, { status: 502 });

  } catch (error: any) {
    console.error("Server catch in /api/bhoomi:", error);
    return NextResponse.json({ 
      reply: `Connection error: ${error.message || 'Unable to reach Bhoomi AI service'}` 
    }, { status: 500 });
  }
}