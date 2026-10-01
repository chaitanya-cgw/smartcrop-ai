import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || !body.message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const { message, language = 'en' } = body;
    const apiKey = (process.env.GEMINI_API_KEY || 'AQ.Ab8RN6IiOnolAoahg9OcpLrkf0t5m3ZjTuulJMhHTCQpXG9VLg').trim();

    const languageMap: Record<string, string> = {
      te: 'Telugu (తెలుగు)',
      hi: 'Hindi (हिन्दी)',
      ta: 'Tamil (தமிழ்)',
      en: 'Indian English'
    };

    const targetLanguage = languageMap[language] || 'Indian English';

    const systemPrompt = `You are Bhoomi AI, an elite Indian agricultural specialist and trade advisor on AgriLock.
Answer the farmer's question directly, practically, and accurately in ${targetLanguage}.
Provide real, context-specific agronomy or market advice based on what was asked.
Keep your response concise (2 to 4 sentences).
Do not use markdown symbols like asterisks (*), hashtags (#), or bullets, so it can be spoken smoothly by text-to-speech.`;

    // Try primary gemini-2.5-flash then fallback to gemini-1.5-flash
    const models = ['gemini-2.5-flash', 'gemini-1.5-flash'];
    let replyText: string | null = null;
    let lastError: any = null;

    for (const model of models) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
            'x-goog-api-key': apiKey
          },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: `${systemPrompt}\n\nFarmer Question: ${message}` }]
              }
            ],
            generationConfig: {
              maxOutputTokens: 300,
              temperature: 0.7
            }
          })
        });

        const data = await response.json();

        if (response.ok && data.candidates?.[0]?.content?.parts?.[0]?.text) {
          replyText = data.candidates[0].content.parts[0].text.trim();
          break;
        } else {
          lastError = data.error?.message || JSON.stringify(data);
          console.warn(`Gemini ${model} attempt failed:`, lastError);
        }
      } catch (err: any) {
        lastError = err.message;
      }
    }

    if (replyText) {
      return NextResponse.json({ reply: replyText });
    }

    return NextResponse.json({ 
      reply: `Gemini live generation notice: ${lastError || 'Unable to get text from Gemini'}` 
    }, { status: 502 });

  } catch (error: any) {
    console.error("Bhoomi Route Error:", error);
    return NextResponse.json({ 
      reply: `Connection error: ${error.message || 'Unable to reach Bhoomi AI'}` 
    }, { status: 500 });
  }
}