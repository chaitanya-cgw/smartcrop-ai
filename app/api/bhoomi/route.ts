import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || !body.message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const { message, language = 'en' } = body;
    const openRouterKey = process.env.OPENROUTER_API_KEY?.trim();
    const groqKey = process.env.GROQ_API_KEY?.trim() || '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';

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

    // 1. Try OpenRouter with auto free-pool selector
    if (openRouterKey) {
      const openRouterModels = [
        'openrouter/free',
        'nvidia/nemotron-3-super-120b-a12b:free',
        'meta-llama/llama-3.3-70b-instruct:free'
      ];

      for (const model of openRouterModels) {
        try {
          const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${openRouterKey}`,
              'HTTP-Referer': 'http://localhost:3000',
              'X-Title': 'AgriLock Bhoomi AI'
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

          const data = await res.json();
          const content = data.choices?.[0]?.message?.content?.trim();
          if (res.ok && content) {
            return NextResponse.json({ reply: content });
          }
        } catch {
          // continue to next model
        }
      }
    }

    // 2. Try Groq with active production model
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

        const gData = await groqRes.json();
        const reply = gData.choices?.[0]?.message?.content?.trim();
        if (groqRes.ok && reply) {
          return NextResponse.json({ reply });
        }
      } catch {
        // continue to agronomy knowledge base
      }
    }

    // 3. Built-in Dynamic Agronomic Engine (Zero Network / Token Dependency)
    const q = message.toLowerCase();
    let dynamicAnswer = "";

    if (q.includes("sugarcane") || q.includes("చెరకు") || q.includes("गन्ना")) {
      if (language === 'te') {
        dynamicAnswer = "చెరకు పంటను ప్రధానంగా మూడు కాలాల్లో నాటుకోవచ్చు: అద్సాలీ జూన్ నుండి జూలై, ఏకసాలీ అక్టోబర్ నుండి నవంబర్, మరియు సూరు జనవరి నుండి ఫిబ్రవరి. ఆంధ్రప్రదేశ్ మరియు తెలంగాణ ప్రాంతాల్లో సమృద్ధిగా నీటి వసతి మరియు మంచి ఎండ ఉండే నేలల్లో అక్టోబర్ నాట్లు అత్యధిక దిగుబడిని ఇస్తాయి. విత్తే ముందు విత్తన మొలకలను కార్బండజిమ్ ద్రావణంతో శుద్ధి చేయడం మంచిది.";
      } else if (language === 'hi') {
        dynamicAnswer = "गन्ने की बुवाई का सबसे उपयुक्त समय शरद ऋतु में अक्टूबर से नवंबर और वसंत ऋतु में फरवरी से मार्च तक होता है। अच्छी जल निकासी वाली दोमट मिट्टी में 30 से 35 डिग्री सेल्सियस तापमान में गन्ना तेजी से बढ़ता है। बुवाई से पहले बीजों का कार्बेन्डाजिम से उपचार अवश्य करें ताकि लाल सड़न रोग से बचाव हो सके।";
      } else {
        dynamicAnswer = "The best time to plant sugarcane in India is between October to November for the Autumn crop, and February to March for the Spring crop. In tropical areas, planting in well-drained loamy soil with steady irrigation delivers optimum tillering and high sugar recovery. Treat sets with 0.1 percent Carbendazim before furrow planting to prevent red rot.";
      }
    } else if (q.includes("paddy") || q.includes("వరి") || q.includes("rice") || q.includes("धान")) {
      if (language === 'te') {
        dynamicAnswer = "వరి పంటను ఖరీఫ్ లో జూన్ నుండి జూలై మధ్య మరియు రబీ లో నవంబర్ చివరి నుండి డిసెంబర్ మధ్య విత్తుకోవడం ఉత్తమం. 25 నుండి 30 రోజుల నారును ప్రధాన పొలంలో సరైన వరుస క్రమంలో నాటుకోవాలి. నాటే సమయంలో సమతుల్య ఎన్పీకే ఎరువులు మరియు జింక్ సల్ఫేట్ వేస్తే మంచి పిలకలు వచ్చి దిగుబడి పెరుగుతుంది.";
      } else if (language === 'hi') {
        dynamicAnswer = "धान की खेती के लिए खरीफ मौसम में नर्सरी जून के पहले पखवाड़े में और रोपाई जुलाई में की जाती है, जबकि रबी के लिए नवंबर-दिसंबर सबसे अच्छा है। 21 से 25 दिन पुराने पौधों की रोपाई करें और संतुलित नत्रजन, फास्फोरस तथा पोटाश का उपयोग करें। खैरा रोग से बचाव के लिए खेत में जिंक सल्फेट अवश्य डालें।";
      } else {
        dynamicAnswer = "The ideal sowing window for Kharif paddy is June to July with monsoon onset, while Rabi nursery is raised between November and December. Transplant 21 to 25-day-old seedlings into puddled fields with 20x15 cm spacing. Apply balanced NPK along with 25 kg Zinc Sulphate per hectare to ensure strong tillering and prevent Khaira disease.";
      }
    } else if (q.includes("wheat") || q.includes("గోధుమ") || q.includes("गेहूं")) {
      if (language === 'te') {
        dynamicAnswer = "గోధుమ సాగుకు నవంబర్ మొదటి వారం నుండి నవంబర్ 25 వరకు విత్తుకోవడం అత్యంత అనుకూలమైన సమయం. విత్తే సమయంలో చల్లని వాతావరణం మరియు తేలికపాటి తేమ ఉండడం వల్ల వేర్లు బాగా అభివృద్ధి చెందుతాయి. మొదటి నీటి తడిని విత్తిన 21 రోజుల తర్వాత కిరీటం వేర్లు ఏర్పడే కీలక దశలో తప్పనిసరిగా అందించాలి.";
      } else if (language === 'hi') {
        dynamicAnswer = "गेहूं की समय पर बुवाई के लिए 1 से 20 नवंबर का समय सर्वोत्तम माना जाता है। देर से बुवाई करने पर प्रति सप्ताह उत्पादन में गिरावट आती है। बुवाई के 21 दिन बाद सीआरआई यानी शीर्ष जड़ बनते समय पहली सिंचाई अवश्य करें और संतुलित मात्रा में यूरिया तथा डीएपी दें।";
      } else {
        dynamicAnswer = "The prime sowing period for wheat in India is November 1st to 20th under cool weather conditions. Timely sowing prevents terminal heat stress during grain filling stage in March. Ensure the first critical irrigation is applied at 21 days after sowing during the Crown Root Initiation stage.";
      }
    } else if (q.includes("price") || q.includes("lock") || q.includes("ధర") || q.includes("భావ") || q.includes("agrilock")) {
      if (language === 'te') {
        dynamicAnswer = "అగ్రిలాక్ 6 గంటల రవాణా ధర లాక్ సదుపాయం ద్వారా మీరు పంటను మార్కెట్‌కు తీసుకెళ్లే సమయంలో ధర తగ్గినా మీరు లాక్ చేసుకున్న అసలు ధరకే వ్యాపారి కొనుగోలు చేస్తారు. నాణ్యత AI వెరిఫికేషన్ పూర్తయిన వెంటనే ఒప్పందం అమల్లోకి వస్తుంది. మార్కెట్ ఒడిదుడుకుల నుండి రైతులకు పూర్తి ఆర్థిక రక్షణ లభిస్తుంది.";
      } else {
        dynamicAnswer = "AgriLock provides a guaranteed 6-hour transit price lock that protects farmers from sudden mandi price dips while crops are in transit. Once quality parameters are verified on-platform, your locked price is legally bound by smart contract. If spot prices fall during transit, you still receive the higher locked settlement.";
      }
    } else {
      if (language === 'te') {
        dynamicAnswer = "మీరు అడిగిన ప్రశ్నకు అనుగుణంగా సరైన నేల రకం, విత్తే సమయం మరియు సమతుల్య ఎరువుల యాజమాన్యం పాటించడం ద్వారా పంట దిగుబడిని పెంచుకోవచ్చు. తెగుళ్ళ నివారణకు ఆకులపై లక్షణాలను గమనించి సిఫార్సు చేసిన క్రిమిసంహారకాలను మాత్రమే పిచికారీ చేయాలి. మీ పొలం వివరాలు లేదా మరింత నిర్దిష్టమైన పంట సమస్య ఉంటే ఇక్కడ తెలపండి.";
      } else if (language === 'hi') {
        dynamicAnswer = "उत्कृष्ट पैदावार के लिए मिट्टी की जांच के आधार पर संतुलित पोषक तत्वों का प्रयोग और सही समय पर बुवाई करें। कीट या रोग की शुरुआती अवस्था में नीम तेल अथवा अनुशंसित दवा का ही छिड़काव करें। अपनी विशिष्ट फसल और समस्या का नाम बताएं ताकि सटीक परामर्श दिया जा सके।";
      } else {
        dynamicAnswer = "For optimal crop performance, adhere strictly to recommended regional sowing windows and soil-test-based nutrient applications. Regular field scouting allows early detection of sucking pests and fungal blights before threshold damage occurs. Let me know your specific crop or soil condition for precise chemical and management doses.";
      }
    }

    return NextResponse.json({ reply: dynamicAnswer });

  } catch (error: any) {
    console.error("Bhoomi Route Final Error:", error);
    return NextResponse.json({ 
      reply: "Bhoomi AI is analyzing field recommendations. Please ask your agricultural question." 
    }, { status: 200 });
  }
}