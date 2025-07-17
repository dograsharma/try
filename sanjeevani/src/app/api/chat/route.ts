import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client only if API key is available
let openai: OpenAI | null = null;
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

const SYSTEM_PROMPT = `You are Sanjeevani, a compassionate and empathetic mental wellness assistant. Your role is to provide supportive, caring responses that promote mental well-being. 

Guidelines for your responses:
- Always respond with warmth, empathy, and understanding
- Validate the user's feelings and experiences
- Offer gentle guidance and coping strategies when appropriate
- Suggest healthy activities like breathing exercises, journaling, or mindfulness
- If someone expresses serious distress, gently encourage them to seek professional help
- Never provide medical diagnoses or replace professional therapy
- Keep responses concise but meaningful (2-4 sentences typically)
- Use inclusive, non-judgmental language
- If asked about crisis situations, remind them of emergency resources

Remember: You are a supportive companion, not a replacement for professional mental health care. Your goal is to provide comfort, validation, and gentle guidance toward wellness.`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, conversationHistory = [] } = body;

    if (!message?.trim()) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Check if OpenAI API key is configured
    if (!openai || !process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { 
          error: 'OpenAI API key not configured',
          response: "I'm sorry, but I'm currently unable to respond. Please check back later or reach out to a mental health professional if you need immediate support. Remember, you're not alone." 
        },
        { status: 500 }
      );
    }

    // Moderation check
    try {
      const moderationResponse = await openai.moderations.create({
        input: message,
      });

      const flagged = moderationResponse.results[0]?.flagged;
      const categories = moderationResponse.results[0]?.categories;

      // If content is flagged for self-harm or violence, provide crisis resources
      if (flagged && (categories?.['self-harm'] || categories?.violence)) {
        return NextResponse.json({
          response: "I'm concerned about your message and want to make sure you're safe. Please reach out for immediate support:\n\n🚨 Emergency: Call 9152987821 (iCall India)\n🌐 Visit: snehi.org\n\nYou matter, and there are people who want to help you through this difficult time.",
          flagged: true,
          category: 'crisis'
        });
      }

      // For other flagged content, provide a gentle redirect
      if (flagged) {
        return NextResponse.json({
          response: "I understand you're going through something difficult. Let's focus on healthy ways to process these feelings. Would you like to try a breathing exercise, or perhaps talk about what's been on your mind lately?",
          flagged: true,
          category: 'general'
        });
      }
    } catch (moderationError) {
      console.error('Moderation error:', moderationError);
      // Continue without moderation if service is unavailable
    }

    // Prepare conversation history for OpenAI
    const messages = [
      { role: 'system' as const, content: SYSTEM_PROMPT },
      ...conversationHistory.slice(-6), // Keep last 6 messages for context
      { role: 'user' as const, content: message }
    ];

    // Generate response using OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
      max_tokens: 250,
      temperature: 0.7,
      presence_penalty: 0.1,
      frequency_penalty: 0.1,
    });

    const response = completion.choices[0]?.message?.content;

    if (!response) {
      throw new Error('No response generated');
    }

    return NextResponse.json({
      response: response.trim(),
      flagged: false
    });

  } catch (error) {
    console.error('Chat API error:', error);
    
    // Provide a helpful fallback response
    const fallbackResponse = "I'm having trouble connecting right now, but I want you to know that your feelings are valid and you're not alone. If you need immediate support, please reach out to: 9152987821 (iCall India) or visit snehi.org. Take care of yourself.";
    
    return NextResponse.json(
      { 
        error: 'Something went wrong',
        response: fallbackResponse 
      },
      { status: 500 }
    );
  }
}