
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

  // 1. SUBJECT Instructions based on MVP Categories
  let subjectInstructions = "";
  switch(category) {
    case ProductCategory.JEWELRY:
        subjectInstructions = "Subject is high-end jewelry (ring/necklace/watch). Focus on macro details, metallic luster, stone clarity, and sharp facets. Eliminate micro-scratches.";
        break;
    case ProductCategory.COSMETICS:
        subjectInstructions = "Subject is a cosmetic product (perfume/bottle/cream). Focus on glass transparency, liquid refraction, and smooth texture of packaging. Clean, sterile premium look.";
        break;
    case ProductCategory.SMALL_GOODS:
        subjectInstructions = "Subject is a small lifestyle item (candle/mug/gift). Focus on texture realism (wax, ceramic, paper) and inviting warmth.";
        break;
    case ProductCategory.TECH:
        subjectInstructions = "Subject is a consumer electronic. Focus on matte/glossy contrasts, sharp edges, buttons, and screen clarity. High-tech, sleek aesthetic.";
        break;
    case ProductCategory.GENERAL:
    default:
        subjectInstructions = "Subject is a general e-commerce product. Maintain absolute fidelity to original form and color. Sharp focus throughout.";
        break;
  }

  // 2. SCENE Instructions based on MVP Scenes
  let sceneInstructions = "";
  switch(scene) {
    case SceneType.PURE_STUDIO:
        sceneInstructions = "Background: PURE WHITE / LIGHT GREY cyclorama. Professional e-commerce catalog style. 'Infinity cove' curve. Shadows: Soft contact shadows only. Zero distractions.";
        break;
    case SceneType.DARK_PREMIUM:
        sceneInstructions = "Background: DARK ANTHRACITE / BLACK. Luxury aesthetic. Surface: Slightly reflective black glass or matte slate. Atmosphere: Premium, exclusive, high-value.";
        break;
    case SceneType.SOFT_GRADIENT:
        sceneInstructions = "Background: PASTEL GRADIENT (Beige to Cream or Soft Grey to White). Modern social media aesthetic. Clean, soft, inviting, airy atmosphere.";
        break;
    case SceneType.TABLETOP_MINIMAL:
        sceneInstructions = "Background: Blurred minimal interior. Surface: TEXTURED WOOD or CONCRETE tabletop. Depth of field: Shallow (Bokeh background). Boutique shop feel.";
        break;
    case SceneType.FLOATING_OBJECT:
        sceneInstructions = "Background: CLEAN SOLID COLOR (Neutral or Vibrant). Composition: Subject FLOATING in mid-air. ZERO contact shadows. Cast distinct drop shadow on a distant wall or floor to create depth. Anti-gravity, 3D render aesthetic. Modern digital look.";
        break;
    case SceneType.TRANSPARENT:
        sceneInstructions = "Background: PURE SOLID WHITE (#FFFFFF). NO SHADOWS on background. ISOLATE the product completely. Create high contrast between product and background for easy clipping path/mask creation. Cutout style.";
        break;
    default:
        sceneInstructions = "Professional studio environment.";
  }

  // 3. LIGHTING Instructions based on MVP Profiles
  let lightingInstructions = "";
  switch(lighting) {
    case LightingType.SOFTBOX:
        lightingInstructions = "Lighting: SOFTBOX STUDIO. Large light source, very soft shadows, balanced exposure. No harsh highlights. Even illumination.";
        break;
    case LightingType.DIRECTIONAL:
        lightingInstructions = "Lighting: DIRECTIONAL CONTRAST. Single light source from side. Distinct, controlled shadows. Adds depth and 3D form definition. Dramatic but professional.";
        break;
    case LightingType.HIGH_KEY:
        lightingInstructions = "Lighting: HIGH-KEY CLEAN. Very bright, almost overexposed background. Subject is evenly lit with fill lights. Cheerful, commercial, energetic.";
        break;
    case LightingType.MOODY:
        lightingInstructions = "Lighting: MOODY SIDE LIGHT. Low-key lighting. Rim lighting highlights edges. Shadows are deep. Artistic, cinematic, emotional atmosphere.";
        break;
    default:
        lightingInstructions = "Balanced studio lighting.";
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

  const fullPrompt = `STÜDYO SİMÜLASYONU: Profesyonel Ürün Çekimi. ${subjectInstructions} ORTAM: ${sceneInstructions} IŞIK: ${lightingInstructions} AÇI: ${angleInstructions}. ${watermarkInstruction} ÇIKTI: 4K fotoğraf gerçekçiliği, ticari kalite, ürün formunu %100 koru.`;
  
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
