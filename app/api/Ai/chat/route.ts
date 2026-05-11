

// import { NextResponse } from 'next/server'
// import { auth } from '@/lib/auth'

// const OPENRAI_API_URL = 'https://api.openai.com/v1/chat/completions'
// const OPENAI_API_KEY = process.env.OPEN_AI

// const AVAILABLE_MODELS = [
//   'openai/gpt-3.5-turbo',
//   'openai/gpt-4o-mini',
//   'anthropic/claude-3-haiku',
//   'meta-llama/llama-3-8b-instruct',
//   'mistralai/mistral-7b-instruct',
//   'deepseek/deepseek-chat',
//   'google/gemini-flash-1.5',
//   'microsoft/phi-3-mini-128k-instruct',
// ]

// export async function POST(request: Request) {
//   try {
//     const { message, history } = await request.json()
    
//     if (!message) {
//       return NextResponse.json({ error: 'Message is required' }, { status: 400 })
//     }
    
//     // ✅ تجهيز الـ messages history للـ API
//     const messages = [
//       {
//         role: 'system',
//         content: `You are a helpful pet care assistant specializing in rabies prevention, pet vaccination, and animal health. 
//         You speak both Arabic and English. Always be friendly, informative, and safety-conscious. 
//         If someone asks about medical emergencies, advise them to contact a veterinarian immediately.
//         Keep responses helpful and warm.`
//       },
//       ...(history || []),
//       {
//         role: 'user',
//         content: message
//       }
//     ]
    
//     console.log('📤 Sending to OpenRouter with model: openai/gpt-3.5-turbo')
    
//     const response = await fetch(OPENRAI_API_URL, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${OPENAI_API_KEY}`,
//         'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
//         'X-Title': 'PetCare AI Assistant',
//       },
//       body: JSON.stringify({
//         model: 'openai/gpt-3.5-turbo', // ✅ نموذج متاح وشغال
//         messages: messages,
//         temperature: 0.7,
//         max_tokens: 500,
//       }),
//     })
    
//     if (!response.ok) {
//       const errorData = await response.json()
//       console.error('OpenRouter API error:', errorData)
      
//       // ✅ تجربة نموذج آخر لو فشل الأول
//       if (errorData.error?.message?.includes('model')) {
//         console.log('🔄 Trying fallback model: anthropic/claude-3-haiku')
//         const fallbackResponse = await fetch(OPENRAI_API_URL, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${OPENAI_API_KEY}`,
//             'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
//             'X-Title': 'PetCare AI Assistant',
//           },
//           body: JSON.stringify({
//             model: 'anthropic/claude-3-haiku', // ✅ نموذج بديل
//             messages: messages,
//             temperature: 0.7,
//             max_tokens: 500,
//           }),
//         })
        
//         if (fallbackResponse.ok) {
//           const fallbackData = await fallbackResponse.json()
//           const reply = fallbackData.choices?.[0]?.message?.content || 'Sorry, I could not process that request.'
//           return NextResponse.json({ reply: reply }, { status: 200 })
//         }
//       }
      
//       return NextResponse.json(
//         { error: errorData.error?.message || 'Failed to get response from AI' },
//         { status: response.status }
//       )
//     }
    
//     const data = await response.json()
//     const reply = data.choices?.[0]?.message?.content || 'Sorry, I could not process that request.'
    
//     console.log('📥 AI Response received')
    
//     return NextResponse.json({ reply: reply }, { status: 200 })
    
//   } catch (error) {
//     console.error('Error in chat API:', error)
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
//   }
// }

import { NextResponse } from 'next/server'

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions'
const OPENAI_API_KEY = process.env.OPEN_AI

export async function POST(request: Request) {
  try {
    const { message, history } = await request.json()

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    if (!OPENAI_API_KEY) {
      console.error('Missing OPEN_AI environment variable')
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    const messages = [
      {
        role: 'system',
        content: `You are a helpful pet care assistant specializing in rabies prevention, pet vaccination, and animal health. 
        You speak both Arabic and English. Always be friendly, informative, and safety-conscious. 
        If someone asks about medical emergencies, advise them to contact a veterinarian immediately.
        Keep responses helpful and warm.`,
      },
      ...(history || []),
      {
        role: 'user',
        content: message,
      },
    ]

    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',   // ✅ plain name, no "openai/" prefix
        messages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('OpenAI API error:', data)
      return NextResponse.json(
        { error: data.error?.message || 'Failed to get response from AI' },
        { status: response.status }
      )
    }

    const reply = data.choices?.[0]?.message?.content || 'Sorry, I could not process that request.'
    return NextResponse.json({ reply }, { status: 200 })

  } catch (error) {
    console.error('Error in chat API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}