
import { ProductCategory, SceneType, LightingType, User, Language } from '../types';
import { constructStudioPrompt } from './geminiService';

const N8N_WEBHOOK_URL = "http://localhost:5678/webhook-test/9293d01d-0e35-4dc6-842d-5c0702f50ce3";

export interface N8nPayload {
  image: string; // Base64
  prompt: string;
  timestamp: string;
  // Configuration Context
  config: {
    category: ProductCategory;
    scene: SceneType;
    lighting: LightingType;
    variation: string;
  };
  // User Context (Full User Object with Permissions)
  user: User; 
  // Client Context
  client: {
    language: Language;
    userAgent: string;
  };
}

/**
 * n8n Webhook'una stüdyo verilerini ve kapsamlı kullanıcı bilgilerini gönderir.
 */
export const processWithN8n = async (
  base64Image: string,
  category: ProductCategory,
  scene: SceneType,
  lighting: LightingType,
  variation: string = 'Standard',
  user: User,
  lang: Language
): Promise<string> => {
  const prompt = constructStudioPrompt(category, scene, lighting, variation);
  
  const payload: N8nPayload = {
    image: base64Image,
    prompt,
    timestamp: new Date().toISOString(),
    config: {
      category,
      scene,
      lighting,
      variation
    },
    user: user, // Sends full user object including features and planType
    client: {
      language: lang,
      userAgent: navigator.userAgent
    }
  };

  console.log("🚀 n8n İstek Atılıyor (Extended Context):", { 
    plan: user.planName, 
    type: user.planType,
    features: user.features,
    config: payload.config 
  });

  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ n8n HTTP Hatası:", response.status, errorText);
      throw new Error(`n8n Sunucu Hatası: ${response.status} ${response.statusText}`);
    }

    const rawData = await response.json();
    console.log("✅ n8n Ham Yanıt:", rawData);

    const data = Array.isArray(rawData) ? rawData[0] : rawData;

    const resultImage = 
      data.output_url || 
      data.url || 
      data.image_url || 
      data.image || 
      data.data || 
      data.output;

    if (!resultImage) {
      console.error("❌ Yanıt içerisinde görsel anahtarı bulunamadı. Gelen veri:", data);
      throw new Error("n8n platformundan geçerli bir görsel dönmedi. Lütfen n8n akışındaki 'Respond to Webhook' düğümünü kontrol edin.");
    }

    if (typeof resultImage === 'string' && resultImage.length > 100 && !resultImage.startsWith('http') && !resultImage.startsWith('data:')) {
      return `data:image/png;base64,${resultImage}`;
    }

    return resultImage;

  } catch (error: any) {
    console.error("🚨 n8n Bağlantı Hatası:", error);
    
    if (error instanceof TypeError && (error.message === "Failed to fetch" || error.message.includes("Load failed"))) {
      throw new Error("n8n servisine bağlanılamadı. n8n ayarlarında N8N_CORS_ALLOWED_ORIGINS değişkenine bu sitenin adresini eklediğinizden veya '*' (herkese açık) yaptığınızdan emin olun.");
    }
    
    throw new Error(error.message || "n8n stüdyo bağlantısı başarısız oldu.");
  }
};
