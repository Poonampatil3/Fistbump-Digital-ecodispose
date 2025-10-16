import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.REACT_APP_GEMINI_API_KEY) {
  console.error('Missing Gemini API key! Please add REACT_APP_GEMINI_API_KEY to your .env file');
}

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY || '');

export const analyzeImage = async (imageData) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

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

      // Enhanced prompt for better structured response
      const prompt = `Analyze this waste item image and provide the following information in JSON format:

{
  "name": "specific name of the item (e.g., 'Plastic Water Bottle', 'Glass Jar', 'Aluminum Can')",
  "material": "primary material (Plastic/Glass/Metal/Paper/Organic/Hazardous/E-Waste/Unknown)",
  "category": "waste category (Plastics & Packaging/Glass/Metals/Paper & Card/Bio-Organic/E-Waste/General Waste)",
  "binColor": "recycling bin color (Blue/Green/Yellow/Brown/Gray/Black/Special Collection)",
  "disposal": "specific disposal instructions for this item",
  "tips": ["tip 1", "tip 2", "tip 3"],
  "confidence": "percentage like 95%"
}

Important:
- For binColor, use standard recycling colors: Blue (paper), Green (glass/organic), Yellow (plastic/packaging), Brown (organic), Gray (general waste), Black (landfill), or Special Collection (e-waste/hazardous)
- Be specific with the item name
- Provide 2-3 practical tips for disposal
- Only return valid JSON, no additional text`;

      const imageRequest = {
        contents: [{
          parts: [
            { text: prompt },
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

      console.log('Raw Gemini Response:', text);

      // Try to extract JSON from the response
      let parsedData;
      try {
        // Remove markdown code blocks if present
        const cleanedText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        parsedData = JSON.parse(cleanedText);
      } catch (parseError) {
        console.error('Failed to parse JSON, attempting fallback parsing:', parseError);
        
        // Fallback: Try to extract information from natural language response
        parsedData = extractFromNaturalLanguage(text);
      }

      // Validate and return structured data
      return {
        id: Date.now().toString(),
        name: parsedData.name || 'Unknown Item',
        material: parsedData.material || 'Unknown',
        category: parsedData.category || 'General Waste',
        disposal: parsedData.disposal || 'Check local guidelines for proper disposal',
        tips: Array.isArray(parsedData.tips) ? parsedData.tips : [
          'Ensure item is clean and dry',
          'Check local recycling guidelines',
          'Remove any non-recyclable components'
        ],
        confidence: parsedData.confidence || 'N/A',
        binColor: mapBinColor(parsedData.binColor || parsedData.material)
      };
    } catch (error) {
      console.error('Image processing error:', error);
      throw new Error(`Image processing failed: ${error.message}`);
    }
  } catch (error) {
    console.error('Error in analyzeImage:', error);
    throw error;
  }
};

// Helper function to extract data from natural language response
const extractFromNaturalLanguage = (text) => {
  const data = {
    name: 'Unknown Item',
    material: 'Unknown',
    category: 'General Waste',
    disposal: 'Check local guidelines',
    binColor: 'gray',
    tips: []
  };

  // Try to extract item name
  const nameMatch = text.match(/(?:item|object|this)(?:\s+is)?(?:\s+a)?(?:\s+an)?\s*:?\s*([^.\n]+)/i);
  if (nameMatch) {
    data.name = nameMatch[1].trim();
  }

  // Try to extract material
  const materialKeywords = ['plastic', 'glass', 'metal', 'paper', 'cardboard', 'aluminum', 'steel', 'organic', 'wood'];
  for (const keyword of materialKeywords) {
    if (text.toLowerCase().includes(keyword)) {
      data.material = keyword.charAt(0).toUpperCase() + keyword.slice(1);
      break;
    }
  }

  // Try to extract bin color
  const binColors = ['blue', 'green', 'yellow', 'brown', 'gray', 'black'];
  for (const color of binColors) {
    if (text.toLowerCase().includes(color + ' bin')) {
      data.binColor = color;
      break;
    }
  }

  return data;
};

// Helper function to map material/bin color to standard colors
const mapBinColor = (binColor) => {
  if (!binColor) return 'gray';
  
  const colorMap = {
    // Direct color matches
    'blue': 'blue',
    'green': 'green',
    'yellow': 'yellow',
    'brown': 'brown',
    'gray': 'gray',
    'grey': 'gray',
    'black': 'gray',
    
    // Material to color mappings
    'plastic': 'yellow',
    'paper': 'blue',
    'cardboard': 'blue',
    'glass': 'green',
    'metal': 'yellow',
    'aluminum': 'yellow',
    'steel': 'yellow',
    'organic': 'brown',
    'food': 'brown',
    'hazardous': 'red',
    'e-waste': 'red',
    'battery': 'red',
    'electronics': 'red'
  };

  const normalized = binColor.toLowerCase().trim();
  return colorMap[normalized] || 'gray';
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