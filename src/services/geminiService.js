import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.REACT_APP_GEMINI_API_KEY) {
  console.error('Missing Gemini API key! Please add REACT_APP_GEMINI_API_KEY to your .env file');
}

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY || '');


export const analyzeImage = async (imageData) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Extract base64 data
    let base64Data;
    if (!imageData) {
      throw new Error('No image data provided');
    }

    try {
      if (imageData.startsWith('data:image/')) {
        // Handle data URL
        base64Data = imageData.split(',')[1];
      } else if (imageData instanceof Blob || imageData instanceof File) {
        // Convert Blob/File to base64
        base64Data = await blobToBase64(imageData);
      } else {
        throw new Error('Invalid image format');
      }

      const imageRequest = {
        contents: [{
          parts: [
            {
              text: "Analyze this image and identify what type of waste item it is. What material is it made of? Which bin should it go in?"
            },
            {
              inlineData: {
                data: base64Data,
                mimeType: "image/jpeg"
              }
            }
          ]
        }]
      };

      const result = await model.generateContent(imageRequest);
      const response = await result.response;
      const text = response.text();

      // Parse the response
      const lines = text.split('\n');
      const data = {};
      
      lines.forEach(line => {
        if (line.includes(':')) {
          const [key, value] = line.split(':').map(s => s.trim());
          data[key.toLowerCase()] = value;
        }
      });

      return {
        id: Date.now().toString(),
        name: data.name || 'Unknown Item',
        material: data.material || 'Unknown',
        category: data.category || 'General Waste',
        binColor: data.bincolor || 'Black',
        tip: data.tip || 'Please dispose of properly',
      };
    } catch (error) {
      throw new Error(`Image processing failed: ${error.message}`);
    }
  } catch (error) {
    console.error('Error in analyzeImage:', error);
    throw error;
  }
};

// Helper function to convert Blob to base64
const blobToBase64 = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = reader.result.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};
