import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.REACT_APP_GEMINI_API_KEY) {
  console.error('Missing Gemini API key! Please add REACT_APP_GEMINI_API_KEY to your .env file');
}

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY || '');

export const getChatbotResponse = async (userMessage) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    const prompt = `You are an AI recycling assistant. Help users with recycling questions.
    Current question: "${userMessage}"
    
    Focus on:
    - Providing accurate recycling information
    - Explaining which bin to use
    - Giving tips for proper disposal
    - Suggesting ways to reduce waste
    
    Keep responses concise and friendly.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Chatbot error:', error);
    throw error;
  }
};
