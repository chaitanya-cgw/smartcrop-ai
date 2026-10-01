import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || !body.message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const { message, language = 'en' } = body;
    
    const geminiKey = process.env.GEMINI_API_KEY?.trim() || 'AQ.Ab8RN6IiOnolAoahg9OcpLrkf0t5m3ZjTuulJMhHTCQpXG9VLg';
    const groqKey = process.env.GROQ_API_KEY?.trim() || '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';

    const languageMap: Record<string, string> = {
      te: 'Telugu (తెలుగు)',
      hi: 'Hindi (हिन्दी)',
      ta: 'Tamil (தமிழ்)',
      en: 'Indian English'
    };

    const targetLanguage = languageMap[language] || 'Indian English';

    const systemPrompt = `You are Bhoomi AI, an elite Indian agricultural specialist and trade advisor on AgriLock.
Answer the farmer's question directly, accurately, and practically in ${targetLanguage}.
Provide real, context-specific agronomy or market advice based on what was asked.
Keep your response concise (2 to 4 sentences).
Do not use markdown symbols like asterisks (*), hashtags (#), or bullets, so it can be spoken smoothly by text-to-speech.`;

    // STRATEGY 1: Pure OAuth Bearer call to Google Gemini (NO x-goog-api-key header)
    if (geminiKey) {
      try {
        const geminiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
        const gRes = await fetch(geminiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${geminiKey}`
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

        const gData = await gRes.json();
        if (gRes.ok && gData.candidates?.[0]?.content?.parts?.[0]?.text) {
          const reply = gData.candidates[0].content.parts[0].text.trim();
          return NextResponse.json({ reply });
        }
      } catch (err) {
        console.warn("Gemini Bearer attempt bypassed, trying Groq live engine...");
      }
    }

    // STRATEGY 2: Live Groq llama-3.1-8b-instant (Always live, ultra-fast)
    if (groqKey) {
      try {
        const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${groqKey}`
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

        const groqData = await groqRes.json();
        if (groqRes.ok && groqData.choices?.[0]?.message?.content) {
          const reply = groqData.choices[0].message.content.trim();
          return NextResponse.json({ reply });
        }
      } catch (err) {
        console.error("Groq engine attempt failed:", err);
      }
    }

    return NextResponse.json({ 
      reply: "Both AI engines are currently refreshing their tokens. Please re-enter your question." 
    }, { status: 502 });

  } catch (error: any) {
    console.error("Bhoomi Route Error:", error);
    return NextResponse.json({ 
      reply: `Connection error: ${error.message || 'Unable to reach Bhoomi AI'}` 
    }, { status: 500 });
  }
}