
import { GoogleGenAI } from "@google/genai";
import { ProductCategory, SceneType, LightingType } from '../types';

// Initialize the client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Converts a File object to a Base64 string.
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      const base64Data = result.split(',')[1] || result;
      resolve(base64Data);
    };
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Constructs a clean, single-string prompt for high-quality generation.
 */
export const constructStudioPrompt = (category: ProductCategory, scene: SceneType, lighting: LightingType): string => {
  
  let subjectInstructions = "";
  if (category === ProductCategory.JEWELRY) {
    subjectInstructions = "Focus on macro details, sparkle, and metal reflections. Gemstones must be sharp and clear.";
  } else if (category === ProductCategory.FASHION) {
    subjectInstructions = "Focus on fabric texture, elegant drape, and high-end editorial composition.";
  } else if (category === ProductCategory.HOME) {
    subjectInstructions = "Focus on interior integration, material realism, and accurate scale.";
  } else if (category === ProductCategory.BEAUTY) {
    subjectInstructions = "Focus on product texture, glossy/matte packaging contrast, and premium aesthetic.";
  } else if (category === ProductCategory.TECH) {
    subjectInstructions = "Focus on sleek surfaces, precise edges, and futuristic technology presentation.";
  } else {
    subjectInstructions = "Maintain product integrity and sharp focus on the main subject.";
  }

  let sceneInstructions = "";
  if (scene.includes('Pure White')) {
    sceneInstructions = "Pure white background, seamless white floor, soft contact shadows, commercial photography style.";
  } else if (scene.includes('Cozy Home')) {
    sceneInstructions = "Modern home interior background, shallow depth of field, warm lifestyle atmosphere.";
  } else if (scene.includes('Dark Minimalist')) {
    sceneInstructions = "Elegant dark charcoal background, high contrast, luxury branding style.";
  } else if (scene.includes('Outdoor')) {
    sceneInstructions = "Natural daylight, soft organic elements in background, fresh outdoor look.";
  } else if (scene.includes('Concrete')) {
    sceneInstructions = "Industrial concrete background, urban aesthetic, minimalist and raw.";
  } else {
    sceneInstructions = "Simple studio background with coordinated color palette.";
  }

  // Combine and clean up (remove extra newlines and spaces)
  const fullPrompt = `ROLE: Professional Product Photographer. SUBJECT (${category}): ${subjectInstructions} SET DESIGN (${scene}): ${sceneInstructions} LIGHTING: ${lighting}. OUTPUT: 4K photorealistic product shot.`;
  
  return fullPrompt.replace(/\s+/g, ' ').trim();
};

/**
 * Sends the image and granular configuration to Gemini.
 */
export const generateProfessionalHeadshot = async (
  base64Image: string,
  mimeType: string, 
  category: ProductCategory,
  scene: SceneType,
  lighting: LightingType
): Promise<string> => {
  try {
    const prompt = constructStudioPrompt(category, scene, lighting);

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: mimeType || 'image/jpeg', 
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        temperature: 0.3, 
      }
    });

    let generatedImageUrl = '';
    const parts = response.candidates?.[0]?.content?.parts;
    
    if (parts) {
      for (const part of parts) {
        if (part.inlineData) {
          generatedImageUrl = `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }

    if (!generatedImageUrl) throw new Error("Görsel oluşturulamadı.");
    return generatedImageUrl;

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "Görüntü işlenirken bir hata oluştu.");
  }
};
