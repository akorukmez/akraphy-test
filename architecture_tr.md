
# Akraphy Studio Teknik Taslak

Bu belge, Akraphy Studio'nun teknik mimarisini ana hatlarıyla belirtir. Backend geliştiricilerinin (n8n tasarımcıları), tam olarak hangi verileri alacaklarını ve frontend'in nasıl çalıştığını anlamaları için hazırlanmıştır.

## 1. Sisteme Genel Bakış

Akraphy Studio, **Thick Client (Akıllı İstemci)** mimarisini izler.
- **Frontend Sorumlulukları:** Kullanıcı Kimlik Doğrulama (Mock), Kredi Yönetimi, **İstem Mühendisliği (Prompt Engineering)**, Görsel Ön İşleme (Base64) ve Sonuç Görüntüleme.
- **Backend Sorumlulukları (n8n):** Görselden Görsele İşleme (Stable Diffusion/Flux), dosya depolama ve sonucun döndürülmesi.

## 2. Servis Katmanı Mimarisi

### A. `geminiService.ts` (Yönetmen)
Bu servis "Stüdyo Yönetmeni" gibi davranır. n8n modu aktifken görüntüyü doğrudan oluşturmaz; bunun yerine **Talimatları** oluşturur.
- **Girdi:** Kategori, Sahne, Işıklandırma, Açı.
- **Çıktı:** Son derece detaylı bir metin istemi (prompt).
- **Mantık:** Kullanıcı seçimlerine dayanarak özel fotoğrafçılık terimlerini (örneğin: "Sonsuzluk fonu", "Softbox difüzyonu", "Makro detaylar") birleştirir.

### B. `n8nService.ts` (Kurye)
Bu servis backend ile iletişimi yönetir.
- **Eylem:** Veri paketinin (payload) hazırlanmasını koordine eder.
- **Bağlam Enjeksiyonu:** `user` (kullanıcı) nesnesini pakete ekler. Bu, backend'in şu gibi mantıkları uygulamasını sağlar:
  - *Eğer Plan == 'Kurumsal' ise, Yüksek Çözünürlüklü Model kullan.*
  - *Eğer Plan == 'Deneme' ise, filigran ekle.*

### C. `authService.ts` & `historyService.ts` (Durum)
- **Kalıcılık:** Kullanıcı oturumu ve üretim geçmişini saklamak için Tarayıcı `localStorage` kullanır.
- **Anahtarlar:**
  - `jewelai_users`: Kullanıcı nesnelerini, kredileri ve planları saklar.
  - `jewelai_history`: Son 50 üretilen görseli ve metadatasını saklar.

## 3. Veri Arayüzü Spesifikasyonu (Backend Kontratı)

n8n iş akışı **MUTLAKA** aşağıdaki JSON şemasını kabul etmelidir.

### İstek Nesnesi (`POST`)

| Alan | Tür | Açıklama |
| :--- | :--- | :--- |
| `image` | `string` | Yüklenen dosyanın ham Base64 dizisi (başlık temizlenmiş). |
| `prompt` | `string` | Frontend tarafından oluşturulan nihai, mühendisliği yapılmış istem. |
| `timestamp` | `string` | İstek zamanının ISO formatı. |
| `config` | `Object` | Çekimin teknik yapılandırması. |
| `config.category` | `string` | Enum: `JEWELRY`, `FASHION`, `HOME`, vb. |
| `config.scene` | `string` | Enum: `CLEAN_WHITE`, `LIFESTYLE_HOME`, vb. |
| `config.lighting` | `string` | Enum: `STUDIO_SOFT`, `NEON_VIBE`, vb. |
| `config.variation` | `string` | Açı etiketi (örneğin: "Front Standard"). |
| `user` | `Object` | **Mantık için Kritik.** Kullanıcı bağlamı. |
| `user.id` | `string` | Kullanıcı ID. |
| `user.email` | `string` | Kullanıcı E-posta. |
| `user.plan` | `string` | Plan Adı (`Free Trial`, `Starter`, `Pro`, `Studio`, `Enterprise`). |
| `user.credits` | `number` | Mevcut kredi bakiyesi. |
| `client` | `Object` | İstemci metadatası. |
| `client.language` | `string` | `en` veya `tr`. |

### Yanıt Nesnesi

Backend aşağıdaki anahtarlardan herhangi birini döndürebilir; frontend bunları şu sırayla kontrol eder:
1. `output_url` (Public URL)
2. `url`
3. `image_url`
4. `image` (Base64)
5. `data` (Base64)
6. `output`

## 4. Yürütme Akışı (Toplu Mod)

Kullanıcı "Toplu Mod"u seçtiğinde (örneğin 3 sahne seçili):
1. Frontend toplam işlem sayısını hesaplar (örneğin 3 Sahne * 5 Açı = 15 Üretim).
2. Seçilen sahneler üzerinde döngü kurar.
3. Her açı varyasyonu için benzersiz bir `prompt` oluşturur.
4. Her varyasyon için `processWithN8n` fonksiyonunu tek tek çağırır.
5. **Not:** Döngüyü frontend yönetir. Backend tekil istekleri sırayla (veya ağ durumuna göre paralel) alır.

## 5. Güvenlik ve Kısıtlamalar
- **Kimlik Doğrulama:** Şu anda LocalStorage ile simüle edilmektedir. Prodüksiyon backend'inde, `user.id` doğrulaması yapılmalı veya `n8nService.ts` içine API Key başlığı eklenmelidir.
- **CORS:** n8n webhook'u, frontend domaininden (veya `*`) gelen isteklere izin vermelidir.
