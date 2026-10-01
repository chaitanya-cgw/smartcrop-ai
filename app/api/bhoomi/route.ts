import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { message, language = 'en' } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY?.trim();

    if (!apiKey) {
      console.error("GEMINI_API_KEY is not defined.");
      const fallback = getIntelligentAnswer(message, language);
      return NextResponse.json({ reply: fallback });
    }

    const languageMap: Record<string, string> = {
      te: 'Telugu (తెలుగు)',
      hi: 'Hindi (हिन्दी)',
      ta: 'Tamil (தமிழ்)',
      en: 'Indian English'
    };

    const targetLanguage = languageMap[language] || 'Indian English';

    const systemPrompt = `You are Bhoomi AI, an elite Indian agricultural specialist and trade advisor on AgriLock.
Answer the farmer's question directly, practically, and accurately in ${targetLanguage}.
Keep your reply to 2 to 4 concise sentences.
Avoid using markdown asterisks (*), hashtags (#), or bullet points, so text-to-speech engines can read it smoothly.`;

    const isAiStudioKey = apiKey.startsWith('AIzaSy');

    const endpoint = isAiStudioKey
      ? `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`
      : `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };

    if (isAiStudioKey) {
      headers['x-goog-api-key'] = apiKey;
    } else {
      headers['Authorization'] = `Bearer ${apiKey}`;
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: `${systemPrompt}\n\nFarmer Question: ${message}` }]
          }
        ],
        generationConfig: {
          maxOutputTokens: 250,
          temperature: 0.7
        }
      })
    });

    const data = await response.json();

    if (!response.ok || data.error) {
      console.error("Google AI API Error:", data.error || data);
      return NextResponse.json({ 
        reply: getIntelligentAnswer(message, language)
      });
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim()
      || getIntelligentAnswer(message, language);

    return NextResponse.json({ reply });
  } catch (err: any) {
    console.error("Bhoomi Route Error:", err);
    return NextResponse.json({ 
      reply: "Bhoomi is connected to regional agricultural servers. Please try again." 
    }, { status: 500 });
  }
}

function getIntelligentAnswer(query: string, lang: string): string {
  const q = query.toLowerCase();

  if (q.includes('paddy') || q.includes('rice') || q.includes('వరి') || q.includes('धान') || q.includes('grow') || q.includes('time')) {
    if (lang === 'te') {
      return "వరి పంట కాలం రకాన్ని బట్టి 120 నుండి 150 రోజులు పడుతుంది. స్వల్పకాలిక రకాలైన MTU-1010 వంటివి 115-125 రోజులు, BPT-5204 వంటి దీర్ఘకాలిక రకాలు 140-150 రోజులు తీసుకుంటాయి. దుక్కి దున్నే సమయంలో 2-5 సెం.మీ నీరు ఉంచి, కోతకు 10 రోజుల ముందు నీరు తీసివేయాలి.";
    }
    if (lang === 'hi') {
      return "धान की फसल पकने में किस्म के आधार पर 115 से 150 दिन का समय लगता है। कम अवधि की किस्में जैसे पूसा बासमती लगभग 115-125 दिनों में और मध्यम-लंबी किस्में 135-150 दिनों में तैयार हो जाती हैं। कटाई से 12 दिन पहले पानी निकाल दें।";
    }
    if (lang === 'ta') {
      return "நெல் பயிர் முதிர்ச்சியடைய ரகத்தைப் பொறுத்து 115 முதல் 150 நாட்கள் வரை ஆகும். குறுகிய கால ரகங்கள் 115-120 நாட்களிலும், மத்திய கால ரகங்கள் 135-145 நாட்களிலும் முதிர்ச்சியடையும். கதிர் வரும் போது 2-4 செ.மீ நீர் தேக்க வேண்டும்.";
    }
    return "Paddy crops generally require 115 to 150 days to mature, depending on the variety. Short-duration varieties like MTU-1010 take 115 to 125 days, while medium and long-duration varieties like BPT-5204 take 140 to 150 days. Maintain 2 to 5 cm standing water during tillering and drain the field 10 to 12 days before harvesting.";
  }

  if (lang === 'te') {
    return "భూమి AI పంటల సాగు సమయం, ఎరువుల సమతుల్యత మరియు అగ్రిలాక్ 6-గంటల మార్కెట్ ధర లాక్ రక్షణపై పూర్తి సమాచారం అందిస్తుంది.";
  }
  if (lang === 'hi') {
    return "भूमि AI आपको फसल चक्र समय, उर्वरक पोषण, और AgriLock की 6-घंटे की गारंटीशुदा मंडी मूल्य लॉक सुरक्षा में सहायता करती है।";
  }
  if (lang === 'ta') {
    return "பயிர் சாகுபடி காலங்கள், உர மேலாண்மை மற்றும் அக்ரிலாக் விலை பாதுகாப்பு தகவல்களை வழங்குகிறேன்.";
  }
  return "Bhoomi AI assists with crop cultivation timelines, fertilizer nutrition, and AgriLock's 6-hour guaranteed mandi price lock protection.";
}