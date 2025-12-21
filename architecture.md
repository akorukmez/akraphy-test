
# Akraphy Studio Mimari Dokümantasyonu

Bu belge, Akraphy Studio uygulamasının teknik yapısını ve veri akışını özetler.

## 1. Genel Yapı

Uygulama, modern bir React SPA (Single Page Application) olarak tasarlanmıştır. Sunucusuz (Serverless) bir yapıda çalışır; mantıksal işlemlerin bir kısmı istemci tarafında, karmaşık görüntü işleme süreçleri ise n8n otomasyon katmanı üzerinden harici yapay zeka modellerine aktarılır.

## 2. Bileşenler ve Görevleri

### A. UI Katmanı (components/)
- **App.tsx:** Ana uygulama konteyneri, global state (dil, tema, kullanıcı) yönetimi.
- **StyleSelector:** Kullanıcının kategori, sahne ve ışık seçimlerini yaptığı panel.
- **ComparisonSlider:** "Öncesi/Sonrası" karşılaştırmalarını interaktif olarak sunan bileşen.
- **ProcessingOverlay:** Yapay zeka işleme aşamasında kullanıcıyı bilgilendiren animasyonlu ekran.
- **ImageViewer:** İşlenmiş görseli farklı formatlarda (1:1, 9:16 vb.) indirme imkanı sunan detaylı görüntüleyici.

### B. Servis Katmanı (services/)
- **geminiService.ts:** Ürünün türüne ve seçilen stile göre Gemini (veya benzeri modeller) için profesyonel fotoğrafçılık istemleri (prompt) oluşturur.
- **n8nService.ts:** Yapılandırılmış veriyi ve görseli n8n Webhook adresine POST eder ve sonucu geri alır.
- **authService.ts:** LocalStorage tabanlı kullanıcı yönetimi ve kredi sistemi.

### C. Veri Katmanı (data/ & types.ts)
- **galleryData.ts:** Ana sayfada ve galeride gösterilen örnek çalışmaların "reçeteleri".
- **translations.ts:** Tam kapsamlı TR/EN dil desteği.

## 3. Veri Akışı (Data Flow)

1. **Giriş:** Kullanıcı görsel yükler (Client-side Base64 conversion).
2. **Yapılandırma:** Kullanıcı stüdyo ayarlarını (Sahne, Işık) seçer.
3. **Prompt Mühendisliği:** Seçimler, `geminiService` üzerinden profesyonel bir fotoğrafçılık komutuna dönüştürülür.
4. **İletişim:** `n8nService`, Base64 görseli ve promptu n8n webhook'una iletir.
5. **İşleme:** n8n tarafında arkaplan silme ve yeniden oluşturma (Diffusion) işlemleri gerçekleşir.
6. **Yanıt:** İşlenmiş görsel URL'si veya Base64 verisi uygulamaya geri döner ve kullanıcıya sunulur.

## 4. Güvenlik ve Performans

- **Güvenlik:** API anahtarları çevre değişkenleri (`process.env`) üzerinden yönetilir.
- **Performans:** Görseller tarayıcı tarafında işlenmeden önce Base64'e dönüştürülür, büyük boyutlu dosyaların transferi n8n katmanında optimize edilir.
- **Offline:** LocalStorage kullanımı sayesinde kullanıcı oturumu ve kredileri tarayıcı kapatılsa dahi korunur.
