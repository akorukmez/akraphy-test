
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

export const constructStudioPrompt = (category: ProductCategory, scene: SceneType, lighting: LightingType): string => {
  if (scene === SceneType.TRANSPARENT) {
    return "You are an advanced image segmentation and background removal AI assistant. Your task is to intelligently analyze and remove the background from product images while preserving the integrity of the main product. Your primary objective is to remove the entire background from the product image while maintaining the original product with perfect clarity, sharpness, and all fine details intact. The output format must be a PNG image with transparency (alpha channel) with the product remaining on a transparent background using 8-bit or 32-bit PNG format with proper alpha channel encoding, ensuring zero quality loss on the product itself. Apply intelligent edge detection to identify product boundaries and use anti-aliasing techniques for smooth, natural-looking edges while preserving fine details including textures, patterns, shadows, reflections, and small components. Handle complex edges such as hair, fabric, fur, and liquids with feathering where appropriate, while maintaining crisp edges for hard surfaces and metallic products. Keep the entire physical product in its exact original form including all surface details such as texture, finish, and material appearance. Maintain product shadows and highlights that define form and dimension, keep reflections on glass, metal, or shiny surfaces, and preserve semi-transparent elements like glass or plastic with transparency. All text, logos, and labels on the product must remain, along with product accessories that are part of the complete item. Remove the entire background such as walls, surfaces, paper, and studio backdrops. Remove cast shadows that fall on the background surface but not product shadows. Remove all environmental elements including furniture, other objects, and people. Eliminate any blur or bokeh effects in the background and any non-product elements regardless of size. For products with shadows, keep shadows that are part of the product itself but remove only shadows cast onto the background surface. For transparent or translucent products, preserve the glass, plastic, or transparent material appearance and maintain refraction and reflection properties while keeping any visible contents inside transparent containers. For complex textures, preserve fabric weave and texture patterns, keep metal reflections and surface characteristics, maintain wood and natural material grain, and preserve liquids with their meniscus and transparency effects. For small details, keep dust particles on product surfaces, preserve fine hair, fibers, or bristles, maintain product numbers, barcodes, and markings, and keep decorative elements. Ensure quality with no white or colored halos around edges, no ghosting or fringing artifacts, and no color bleeding from background into product. Deliver uniform and clean transparency with professional, e-commerce ready output. Achieve no jagged or pixelated edges, no over-smoothed details, no loss of product texture or shine, no unnatural color shifts, and no incomplete background removal. For edge cases where the product has similar colors to the background, use color space analysis and intelligent masking based on object form and context. If the background is complex, analyze depth cues and focus distance with multi-algorithm approaches. If the product extends to image edges, preserve all visible portions and extend removal cleanly without cutting product elements. Process by analyzing the input image to identify product and background, segment using color-based and machine learning-based detection methods, refine edges with anti-aliasing and feathering algorithms, validate that all background is removed and no product is affected, and optimize PNG output for transparency and file size. Finally, add a subtle watermark with the text 'AKGRAPHY' in the bottom right corner of the transparent image using semi-transparent white text (approximately 20% opacity) with a professional sans-serif font at appropriate size that does not interfere with the product visibility. The watermark must be elegant, minimal, and professional. Deliver a clean, professional-grade transparent image ready for e-commerce, print, or design use.";
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

  const fullPrompt = `STÜDYO SİMÜLASYONU: Profesyonel Ürün Çekimi. KATEGORİ: ${category}. DETAYLAR: ${subjectInstructions} ARKA PLAN KURULUMU: ${sceneInstructions} IŞIKLANDIRMA: ${lighting}. ÇIKTI: 4K fotoğraf gerçekçiliği, ticari kalite, ürün formunu %100 koru.`;
  
  return fullPrompt.replace(/\s+/g, ' ').trim();
};

export const generateProfessionalHeadshot = async (
  base64Image: string,
  mimeType: string, 
  category: ProductCategory,
  scene: SceneType,
  lighting: LightingType
): Promise<string> => {
  // Re-initialize inside to ensure latest API key context
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const prompt = constructStudioPrompt(category, scene, lighting);

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image', // Best for image editing/simulation
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
        // High fidelity config for simulator realism
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
      // If no image part was returned, check for text (error messaging from model)
      const textPart = parts.find(p => p.text);
      if (textPart) console.warn("Model text response:", textPart.text);
      throw new Error("Stüdyo motoru görsel üretmedi. Lütfen ayarlarınızı kontrol edip tekrar deneyin.");
    }
    
    return generatedImageUrl;

  } catch (error: any) {
    console.error("Studio Engine Error:", error);
    throw new Error(error.message || "Stüdyo simülasyonu sırasında bir hata oluştu.");
  }
};
