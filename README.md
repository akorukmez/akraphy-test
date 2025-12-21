
# Akraphy Studio - AI Product Photography Platform

> **"Saniyeler içinde profesyonel stüdyo kalitesinde görseller oluşturun."**

Akraphy Studio, e-ticaret satıcıları için geliştirilmiş özel bir yapay zeka arayüzüdür. Sıradan telefon fotoğraflarını saniyeler içinde yüksek dönüşümlü pazarlama görsellerine dönüştürür.

## 🌟 Öne Çıkan Özellikler

*   **Akıllı Stüdyo Modları:** Mücevher, Moda, Kozmetik ve Teknoloji gibi dikey alanlar için optimize edilmiş yapay zeka istemleri.
*   **Gelişmiş Arkaplan Kütüphanesi:** Saf Beyaz (Pazaryeri uyumlu), Yaşam Alanı, Dış Mekan, Mermer ve daha fazlası.
*   **Gerçekçi Işık Motoru:** 3D geometriyi anlayan yapay zeka ile doğal gölge ve yansıma oluşturma.
*   **Profesyonel İndirme Seçenekleri:** Kare (1:1), Portre (9:16), Hikaye (4:5) gibi sosyal medya ve web formatları.

## 🚀 Hızlı Başlangıç (Test Modu)

Uygulama şu an **akraphy@akraphy.com** admin kullanıcısı ile otomatik olarak başlar. Admin kullanıcısı **Studio Plan** (250 kredi) yetkilerine sahiptir.

## 🏗 Teknik Mimari

*   **Frontend:** React 19 (TypeScript)
*   **Styling:** Tailwind CSS (Anthracite Dark Mode)
*   **Engine:** @google/genai (Gemini 2.5 Flash Image)
*   **Automation:** n8n Webhook Integration

## 🔌 n8n Entegrasyonu

Frontend, n8n veya benzeri platformlara şu JSON payload'unu gönderir:
```json
{
  "image": "base64_string...",
  "category": "JEWELRY",
  "scene": "CLEAN_WHITE",
  "lighting": "STUDIO_SOFT",
  "prompt": "Full AI system instruction..."
}
```

---
© 2024 Akraphy Studio. All rights reserved.
