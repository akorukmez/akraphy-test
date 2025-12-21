
import { ProductCategory, SceneType, LightingType } from '../types';
import { constructStudioPrompt } from './geminiService';

const N8N_WEBHOOK_URL = "https://n8n-cb9h.onrender.com/webhook-test/e9725b70-543e-4419-97dc-a4c1b4666463";

export interface N8nPayload {
  image: string; // Base64
  category: ProductCategory;
  scene: SceneType;
  lighting: LightingType;
  prompt: string;
  timestamp: string;
}

/**
 * n8n Webhook'una stüdyo verilerini gönderir ve gelen yanıtı işler.
 */
export const processWithN8n = async (
  base64Image: string,
  category: ProductCategory,
  scene: SceneType,
  lighting: LightingType
): Promise<string> => {
  const prompt = constructStudioPrompt(category, scene, lighting);
  
  const payload: N8nPayload = {
    image: base64Image,
    category,
    scene,
    lighting,
    prompt,
    timestamp: new Date().toISOString()
  };

  console.log("🚀 n8n İstek Atılıyor:", { category, scene, lighting });

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
    if (error.message === "Failed to fetch" || error.message.includes("Load failed")) {
      throw new Error("n8n servisine bağlanılamadı. n8n tarafında CORS ayarlarının açık olduğundan veya Webhook URL'nin doğruluğundan emin olun.");
    }
    throw new Error(error.message || "n8n stüdyo bağlantısı başarısız oldu.");
  }
};
