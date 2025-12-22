
import { GoogleGenAI } from "@google/genai";
import { ProductCategory, SceneType, LightingType } from '../types';

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

export const constructStudioPrompt = (category: ProductCategory, scene: SceneType, lighting: LightingType, variation: string = 'Standard'): string => {
  // Common watermark instruction for all generations
  const watermarkInstruction = "CRITICAL SECURITY OVERLAY: Apply a repeating, semi-transparent watermark text 'akraphy' diagonally across the entire image. The text 'akraphy' must start from the top-left and repeat multiple times towards the bottom-right, covering the entire frame. Use a professional sans-serif font with 20-25% opacity. The watermark should be subtle enough to see the product details but clearly visible as a security pattern across the whole photo.";

  if (scene === SceneType.TRANSPARENT) {
    return `You are an advanced image segmentation AI. Remove the entire background from the product image while maintaining the original product with perfect clarity. ${watermarkInstruction} Output format must be a clean PNG. Apply intelligent edge detection for smooth edges. Maintain product shadows and highlights that define form. Remove environmental elements. Achieve professional, e-commerce ready output.`;
  }

  let subjectInstructions = "";
  if (category === ProductCategory.JEWELRY) {
    subjectInstructions = "Enhance macro details, metallic luster, and stone clarity. Ensure high-fidelity reflections.";
  } else if (category === ProductCategory.FASHION) {
    subjectInstructions = "Focus on fabric texture realism and natural clothing drape in a studio environment.";
  } else if (category === ProductCategory.HOME) {
    subjectInstructions = "Simulate realistic interior placement with accurate perspective and soft shadows.";
  } else if (category === ProductCategory.BEAUTY) {
    subjectInstructions = "Simulate premium cosmetics packaging with clean reflections and skin-tone accurate lighting.";
  } else if (category === ProductCategory.TECH) {
    subjectInstructions = "Sharp edges, matte/glossy surface contrast, and high-tech product aesthetics.";
  } else {
    subjectInstructions = "Maintain product identity and sharp focus.";
  }

  let sceneInstructions = "";
  if (scene.includes('Pure White')) {
    sceneInstructions = "Pure white studio cyclorama. Professional infinity cove background. Clean contact shadows.";
  } else if (scene.includes('Cozy Home')) {
    sceneInstructions = "Soft lifestyle interior. Modern living room background with natural bokeh.";
  } else if (scene.includes('Dark Minimalist')) {
    sceneInstructions = "Luxury dark studio environment. Moody charcoal backdrop with dramatic highlights.";
  } else if (scene.includes('Outdoor')) {
    sceneInstructions = "Natural outdoor setting. Soft daylight, organic textures, and cinematic depth of field.";
  } else if (scene.includes('Concrete')) {
    sceneInstructions = "Industrial studio with concrete textures. Minimalist urban loft aesthetic.";
  } else if (scene.includes('Water')) {
    sceneInstructions = "Splashing water environment. Dynamic ripples and refreshing reflections.";
  } else {
    sceneInstructions = "High-end professional studio environment with balanced color grading.";
  }

  let angleInstructions = "";
  switch(variation) {
    case 'Front Standard':
        angleInstructions = "COMPOSITION: Standard E-commerce Front View. Product centered.";
        break;
    case '45-Degree Side':
        angleInstructions = "COMPOSITION: 3/4 Side Angle showing depth.";
        break;
    case 'Top-Down Flatlay':
        angleInstructions = "COMPOSITION: Top-down Flat Lay (Knolling).";
        break;
    case 'Macro Detail':
        angleInstructions = "COMPOSITION: Close-up Macro Detail focus on texture.";
        break;
    case 'Lifestyle Context':
        angleInstructions = "COMPOSITION: Lifestyle Environmental Shot.";
        break;
    default:
        angleInstructions = "COMPOSITION: Professional Standard View.";
  }

  const fullPrompt = `STÜDYO SİMÜLASYONU: Profesyonel Ürün Çekimi. KATEGORİ: ${category}. VARYASYON/AÇI: ${angleInstructions}. DETAYLAR: ${subjectInstructions} ARKA PLAN KURULUMU: ${sceneInstructions} IŞIKLANDIRMA: ${lighting}. ${watermarkInstruction} ÇIKTI: 4K fotoğraf gerçekçiliği, ticari kalite, ürün formunu %100 koru.`;
  
  return fullPrompt.replace(/\s+/g, ' ').trim();
};

export const generateProfessionalHeadshot = async (
  base64Image: string,
  mimeType: string, 
  category: ProductCategory,
  scene: SceneType,
  lighting: LightingType,
  variation: string = 'Standard'
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const prompt = constructStudioPrompt(category, scene, lighting, variation);

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
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    let generatedImageUrl = '';
    const candidates = response.candidates;
    if (!candidates || candidates.length === 0) throw new Error("Stüdyo motoru yanıt hazırlayamadı.");
    
    const parts = candidates[0].content.parts;
    
    if (parts) {
      for (const part of parts) {
        if (part.inlineData) {
          generatedImageUrl = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }
    }

    if (!generatedImageUrl) {
      throw new Error("Stüdyo motoru görsel üretmedi.");
    }
    
    return generatedImageUrl;

  } catch (error: any) {
    console.error("Studio Engine Error:", error);
    throw new Error(error.message || "Stüdyo simülasyonu sırasında bir hata oluştu.");
  }
};
