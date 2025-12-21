
# Akraphy Studio Teknik Mimari (Mavi Plan)

Bu belge, hem insanlar için bir kılavuz hem de yapay zeka destekli geliştirme (Cursor/Bolt/Neo) için teknik bir temel belge niteliğindedir.

## 1. Genel Yapı
Akraphy Studio, React 19 tabanlı bir SPA'dır (Tek Sayfalı Uygulama). Arayüz (UI), İş Mantığı (Servisler) ve Verilerin net bir şekilde ayrıldığı modüler bir tasarım deseni izler.

## 2. Teknik Yığın
- **Framework:** React 19 (TypeScript).
- **İkonlar:** Lucide-React.
- **Tasarım:** Tailwind CSS (Antrasit/Apple Sistemi).
- **Backend:** n8n Webhook (`https://n8n-cb9h.onrender.com/webhook-test/e9725b70-543e-4419-97dc-a4c1b4666463`).
- **Depolama:** Kalıcılık için tarayıcı LocalStorage (Yerel Depolama).

## 3. Veri Akışı ve Yapay Zeka Süreci
1.  **Yakalama:** Görsel `FileReader` aracılığıyla okunur ve Base64 dizisine dönüştürülür.
2.  **Mühendislik:** `geminiService.ts`, kullanıcı seçimlerini teknik fotoğrafçılık terminolojisine çevirir.
3.  **İletişim:** `n8nService.ts` veri paketini (payload) gönderir.
4.  **Dönüşüm:** n8n görseli işler (Inpainting/Outpainting) ve değiştirilmiş sonucu geri gönderir.
5.  **Sonuç Görüntüleyici:** `ImageViewer.tsx`, bozulma olmadan birden fazla sosyal medya formatı sağlamak için dinamik kanvas boyutlandırmasını yönetir.

## 4. Bileşen Hiyerarşisi
- **App.tsx:** Global state (durum), Üst Menü (Kullanıcı Bilgisi/Krediler), Navigasyon (Galeri > Paketler > Rehber).
- **StyleSelector.tsx:** Stüdyo parametreleri için ızgara tabanlı seçim paneli.
- **LandingSections.tsx:** Üst düzey pazarlama bölümleri (Özellikler, Karşılaştırma Sürgüsü, SSS).
- **ShowcaseGallery.tsx:** "Reçeteleri" (dinamik olarak çevrilmiş) gösteren metadata odaklı galeri.
- **PricingModal.tsx / PricingSection.tsx:** Ortalanmış 5 paketli abonelik sistemi.

## 5. Görsel Standartlar (Yapay Zeka Oluşturucuları İçin)
- **Yuvarlatılmış Köşeler:** Ana kapsayıcılar için `rounded-[2rem]` (32px).
- **Glassmorphism:** Yarı saydam katmanlarla (`/80`) `backdrop-blur-xl`.
- **Renk Paleti:**
  - Karanlık Mod: `#0B1120` (Arkaplan), `#151e32` (Kartlar).
  - Vurgular: Apple Mavisi (`#0066CC`), Saf Beyaz ve Keskin Siyah.

## 6. Mantıksal Kalıcılık (AuthService)
- Bu demo için gerçek bir backend sunucusu gerekmez.
- `authService.ts` bir veritabanını simüle eder.
- Krediler, başarılı görsel üretimi sonrasında istemci tarafında düşülür.

---
*Yapay Zeka Odaklı Geliştirme Referansı - Akraphy Studio v1.1*
