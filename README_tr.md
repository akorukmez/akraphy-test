
# Akraphy Studio - Yapay Zeka Ürün Fotoğrafçılığı Platformu

> **"Saniyeler içinde profesyonel stüdyo kalitesinde görseller."**

Akraphy Studio, e-ticaret satıcıları için özel olarak geliştirilmiş bir arayüzdür. Sıradan akıllı telefon fotoğraflarını, "Dijital Stüdyo Yönetmeni" gibi davranarak yüksek dönüşümlü pazarlama görsellerine dönüştürür.

## 🌟 Temel Özellikler

*   **Hibrit Yapay Zeka Mimarisi:** Karmaşık istemleri (prompt) yerel olarak oluşturur (fotoğrafçı rolünü üstlenir) ve yüksek kaliteli işleme (render) için n8n'e gönderir.
*   **Toplu Çekim Modu (Batch):** Tek bir oturumda 5 farklı sahneye kadar üretim yapabilme yeteneği.
*   **Akıllı Bağlam:** Kullanıcı seçimine göre niş alanlar (Mücevher, Moda, Teknoloji) için otomatik istem mühendisliği.
*   **Kullanıcı ve Kredi Sistemi:** LocalStorage tabanlı SaaS simülasyonu. Farklı paketler (Deneme, Başlangıç, Pro, Stüdyo, Kurumsal) içerir.
*   **Geçmiş ve Kalıcılık:** Üretim geçmişini ve kullanıcı kredilerini otomatik olarak tarayıcıda saklar.
*   **Çoklu Dil:** Tam Türkçe ve İngilizce desteği.

## 🏗 Teknik Yığın

*   **Frontend:** React 19 (TypeScript)
*   **Derleme:** Vite / ESR Modules
*   **Stil:** Tailwind CSS (Özel "Antrasit" Koyu Mod & "Apple" Açık Mod)
*   **Durum Yönetimi:** React Hooks + LocalStorage
*   **İkonlar:** Lucide-React
*   **Yapay Zeka Entegrasyonu:**
    *   **İstem Motoru:** `geminiService.ts` (İstemci Tarafı Mantık)
    *   **Üretim Motoru:** n8n Webhook Entegrasyonu

## 🔌 Backend Entegrasyonu (n8n)

Uygulama, ağır görüntü işleme yükünü bir n8n iş akışına devretmek üzere tasarlanmıştır. Frontend "düşünme" (İstem Mühendisliği) kısmını, backend ise "yapma" (Diffusion) kısmını halleder.

### Webhook Veri Paketi (Payload)

Bir kullanıcı seans başlattığında, n8n webhook'una aşağıdaki JSON formatında veri gönderilir:

```json
{
  "image": "base64_string_basliksiz...",
  "prompt": "STÜDYO SİMÜLASYONU: Profesyonel Ürün Çekimi. KATEGORİ: Jewelry... [Tam hazırlanmış istem]",
  "timestamp": "2024-05-20T10:30:00.000Z",
  "config": {
    "category": "JEWELRY",
    "scene": "CLEAN_WHITE",
    "lighting": "STUDIO_SOFT",
    "variation": "Front Standard"
  },
  "user": {
    "id": "user_12345",
    "email": "user@example.com",
    "name": "Ahmet Yılmaz",
    "plan": "Pro",
    "credits": 45
  },
  "client": {
    "language": "tr",
    "userAgent": "Mozilla/5.0..."
  }
}
```

### Beklenen Yanıt
Backend, işlenen görselin URL'sini veya Base64 verisini içeren bir JSON döndürmelidir:
```json
{
  "output_url": "https://..." 
  // VEYA 
  "data": "base64_string..."
}
```

## 🚀 Hızlı Başlangıç (Geliştirici Modu)

1.  **Otomatik Giriş:** Uygulama, testlerin hızlı yapılabilmesi için `akraphy@akraphy.com` (Yönetici / Stüdyo Paketi) ile başlatılır.
2.  **Motor Geçişi:** Arayüzdeki geçiş düğmesini kullanarak "Gemini Studio" (İstemci tarafı mock/üretim) ve "n8n Webhook" arasında geçiş yapabilirsiniz.

---
© 2024 Akraphy Studio. Tüm hakları saklıdır.
