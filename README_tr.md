
# Akraphy Studio - Yapay Zeka Ürün Fotoğrafçılığı Platformu

> **"Saniyeler içinde profesyonel stüdyo kalitesinde görseller."**

Akraphy Studio, e-ticaret satıcıları için özel olarak geliştirilmiş bir yapay zeka arayüzüdür. Sıradan akıllı telefon fotoğraflarını saniyeler içinde yüksek dönüşümlü pazarlama varlıklarına dönüştürür.

## 🌟 Temel Özellikler

*   **Akıllı Stüdyo Modları:** Mücevher, Moda, Kozmetik ve Teknoloji gibi niş alanlar için optimize edilmiş istemler (prompts).
*   **Profesyonel Arkaplan Kütüphanesi:** Saf Beyaz (pazaryeri uyumlu), Yaşam Alanı, Dış Mekan, Mermer ve daha fazlası.
*   **Gerçekçi Işık Motoru:** Doğal gölgeler ve yansımalar oluşturmak için 3D geometriyi anlayan yapay zeka.
*   **Çoklu Format Dışa Aktarma:** "Sığdır ve Bulanıklaştır" mantığıyla 1:1 (Kare), 9:16 (Hikaye) ve 4:5 (Dikey) oranlarında yüksek kaliteli indirmeler.
*   **Kullanıcı Yönetimi:** Kredi takibi ve 5 farklı abonelik planı içeren LocalStorage tabanlı hesap sistemi.
*   **Çoklu Dil Desteği:** Tam kapsamlı Türkçe ve İngilizce yerelleştirme.

## 🚀 Hızlı Başlangıç (Test Modu)

Uygulama otomatik olarak **akraphy@akraphy.com** yönetici kullanıcısı ile başlar.
- **Yönetici Ayrıcalıkları:** 999 kredili "Studio" planına erişim.
- **Otomatik Giriş:** Test aşamasında kayıt gerektirmez.

## 🏗 Teknik Mimari

*   **Frontend:** React 19 (TypeScript)
*   **Tasarım:** Özel bir Antrasit/Apple tasarım sistemine sahip Tailwind CSS.
*   **Yapay Zeka Motoru:** İstem mühendisliği (prompt engineering) için Gemini 2.5 Flash entegrasyonu.
*   **Otomasyon:** Ağır iş yükü gerektiren görsel oluşturma (diffusion) süreçleri için n8n Webhook entegrasyonu.

## 🔌 n8n Entegrasyonu

Frontend, n8n webhook'una aşağıdaki JSON yükünü gönderir:
```json
{
  "image": "base64_dizisi...",
  "category": "JEWELRY",
  "scene": "CLEAN_WHITE",
  "lighting": "STUDIO_SOFT",
  "prompt": "Tam yapay zeka sistem talimatı...",
  "timestamp": "ISO-8601"
}
```

---
© 2024 Akraphy Studio. Tüm hakları saklıdır.
