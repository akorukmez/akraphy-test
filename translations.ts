
import { Language } from './types';

export const translations: Record<Language, any> = {
  en: {
    title: "Akraphy Studio",
    subtitle: "Professional Studio Simulator",
    desc: "Instantly give your product photos a professional studio feel. No hardware or lighting equipment needed.",
    poweredBy: "Akraphy Studio Engine™",
    selectStyle: "Studio Configuration",
    uploadTitle: "Import Photo",
    uploadDesc: "Drag & drop or click to upload original product",
    originalSource: "Original Subject",
    aiResult: "Studio Signature",
    waitingInput: "Ready for Shooting",
    waitingDesc: "Import a product photo to start the digital studio session.",
    processButton: "Start Session",
    batchProcessButton: "Start Batch Session",
    processing: "Shooting...",
    save: "Export Image",
    errorValidImage: "Please upload a valid image file.",
    errorLoad: "Failed to load product.",
    errorGen: "Studio simulation failed. Please try again.",
    credits: "Credits",
    buyCredits: "Get Credits",
    noCreditsTitle: "Insufficient Credits",
    noCreditsDesc: "You need more credits to start new studio sessions.",
    pricingTitle: "Studio Access Plans",
    pricingDesc: "Flexible options for digital product photography.",
    mostPopular: "Best Value",
    purchase: "Select Plan",
    successTitle: "Session Confirmed",
    successDesc: "Credits added to your studio account.",
    loginRequired: "Login Required",
    loginDesc: "Please login to manage your studio sessions.",
    loginBtn: "Login / Sign Up",
    logout: "Logout",
    welcome: "Welcome",
    currency: "Currency",
    batchToggle: "Multi-Scene Suite",
    batchDesc: "Select up to 5 scenes for a full studio collection.",
    providerSelect: "Studio Engine",
    download: "Download",
    downloadOptions: "Download Options",
    studioRecipe: "Studio Recipe",
    close: "Close",
    footer: {
      privacy: "Privacy Policy",
      terms: "Terms of Use",
      guide: "Studio Guide",
      rights: "All rights reserved."
    },
    policies: {
      privacy: `At Akraphy Studio, we prioritize the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Akraphy Studio and how we use it.

1. Information Collection
We collect images uploaded for processing solely for the purpose of providing the service. We do not use your images for training public AI models without consent.

2. Data Security
All uploaded files are processed securely and automatically deleted from our temporary servers after processing is complete.

3. User Accounts
We store your name, email, and credit balance information securely. We do not sell or share your personal data with third parties.

4. Cookies
We use local storage to maintain your session and preferences (like theme and language).`,
      terms: `Welcome to Akraphy Studio! These terms and conditions outline the rules and regulations for the use of Akraphy Studio's Website.

1. License
Unless otherwise stated, Akraphy Studio and/or its licensors own the intellectual property rights for all material on Akraphy Studio. You retain full commercial rights to the images you generate using our platform.

2. Usage Limits
You may not use our service to generate illegal, offensive, or harmful content. We reserve the right to ban users who violate this policy.

3. Refund Policy
Digital credits are non-refundable once used. If you experience a technical error, please contact support for credit restitution.

4. Service Availability
We strive for 99.9% uptime but do not guarantee uninterrupted access to the service due to maintenance or third-party provider outages.`
    },
    nav: {
      gallery: "Showcase",
      pricing: "Access Plans",
      help: "Guide",
      faq: "FAQ"
    },
    loadingSteps: [
      "Analyzing product geometry...",
      "Clearing original environment...",
      "Setting up digital scene...",
      "Calibrating studio lighting...",
      "Finalizing high-res details..."
    ],
    landing: {
      featuresTitle: "The Digital Studio Edge",
      features: [
        { title: "Marketplace Physics", desc: "Simulate backgrounds compliant with Amazon, Shopify, and Instagram standards." },
        { title: "Ray-Traced Shadows", desc: "Our engine understands 3D geometry to cast natural shadows and reflections." },
        { title: "Batch Photography", desc: "One product photo, five different studio setups in a single session." },
        { title: "Full Commercial Rights", desc: "You own 100% of the rights to the exported studio images." }
      ],
      comparisonTitle: "Ordinary vs. Studio Quality",
      comparisonDesc: "See how we transform ordinary phone photos into high-conversion marketing assets.",
      faqTitle: "Frequently Asked Questions",
      faq: [
        { q: "Is this a generator tool?", a: "No, Akraphy is a Studio Simulator. It preserves your exact product and places it in a digitally reconstructed professional environment." },
        { q: "What is Batch Mode?", a: "Batch Mode allows you to select up to 5 different scenes. Our engine will process them all at once, giving you a full collection for one product." },
        { q: "How does the 'Transparent' mode work?", a: "It focuses solely on background removal, providing a clean PNG of your product for custom design work." },
        { q: "Can I use it for social media content?", a: "Yes! Use the Multi-Scene Suite to get various vibes (Pastel, Lifestyle, Luxury) for the same product instantly." }
      ]
    },
    steps: {
      upload: "Import",
      analyze: "Calibrate",
      generate: "Simulate",
      done: "Export"
    },
    config: {
      categoryTitle: "1. Category",
      sceneTitle: "2. Scene",
      lightingTitle: "3. Lighting",
      categories: {
        JEWELRY: "Jewelry",
        FASHION: "Fashion",
        HANDMADE: "Handmade",
        HOME: "Furniture",
        BEAUTY: "Cosmetics",
        BOOKS: "Stationery",
        TECH: "Electronics",
        KIDS: "Baby",
        FOOD: "Beverage",
        AUTOMOTIVE: "Auto"
      },
      scenes: {
        TRANSPARENT: "Background Removal",
        CLEAN_WHITE: "Pure White",
        LIFESTYLE_HOME: "Lifestyle",
        LUXURY_DARK: "Premium Dark",
        OUTDOOR_NATURAL: "Natural",
        PASTEL_CREATIVE: "Pastel",
        CONCRETE_URBAN: "Industrial",
        MARBLE_ELEGANCE: "Marble",
        WOODEN_RUSTIC: "Rustic Wood",
        WATER_DYNAMIC: "Water Ripple",
        VELVET_SOFT: "Soft Velvet"
      },
      lighting: {
        STUDIO_SOFT: "Softbox",
        NATURAL_SUN: "Natural",
        PROFESSIONAL_CRISP: "Sharp",
        MOODY_DIM: "Atmospheric",
        GOLDEN_HOUR: "Sunset",
        NEON_VIBE: "Cyber",
        RIM_LIGHT: "Contour"
      }
    },
    packages: {
      free: { name: "Trial", features: ["2 Free Sessions", "Standard Quality", "Basic Support"] },
      starter: { name: "Starter", features: ["10 Sessions", "High Resolution", "No Watermark"] },
      pro: { name: "Pro", features: ["50 Sessions", "4K Ultra-HD", "Commercial License", "Priority Support"] },
      studio: { name: "Studio", features: ["250 Sessions", "Bulk Processing", "Dedicated Manager", "Full Commercial"] },
      enterprise: { name: "Enterprise", features: ["1000+ Sessions", "API Access", "Custom Solutions", "White-label Support"] }
    },
    onboarding: {
      title: "Welcome to Akraphy",
      subTitle: "Your product photography studio is ready.",
      gift: "Welcome Gift",
      credits: "Credits",
      desc: "We've added free credits to your account. Upload your first product to see the magic.",
      btn: "Start Shooting"
    },
    help: {
      title: "Studio User Guide",
      subTitle: "Get professional results in 3 steps",
      steps: [
        { title: "Import Product", desc: "Upload a clear photo. Our engine works best with focused subjects." },
        { title: "Select Setup", desc: "Choose your category and scenes. Enable Batch Mode to generate 5 scenes at once." },
        { title: "Process", desc: "Start the session. Our simulator will reconstruct the environment and lighting." }
      ],
      tipsTitle: "Studio Pro Tips",
      tips: [
        "Enable Batch Mode to save time and get a variety of marketing assets.",
        "Use 'Background Removal' for clean assets you want to use elsewhere.",
        "Ensure the product isn't cut off in the original photo for realistic shadows."
      ],
      btn: "Close Guide"
    }
  },
  tr: {
    title: "Akraphy Studio",
    subtitle: "Stüdyo Simülatörü",
    desc: "Ürün fotoğraflarınıza anında profesyonel stüdyo hissiyatı kazandırın. Donanım veya ışık gerektirmez.",
    poweredBy: "Akraphy Studio Engine™",
    selectStyle: "Stüdyo Yapılandırması",
    uploadTitle: "Ürünü İçe Aktar",
    uploadDesc: "Görseli buraya bırakın veya tıklayın",
    originalSource: "Orijinal Özne",
    aiResult: "Stüdyo İmzası",
    waitingInput: "Çekime Hazır",
    waitingDesc: "Dijital stüdyo seansını başlatmak için bir ürün fotoğrafı yükleyin.",
    processButton: "Seansı Başlat",
    batchProcessButton: "Toplu Seansı Başlat",
    processing: "Çekim Yapılıyor...",
    save: "Görseli Dışa Aktar",
    errorValidImage: "Lütfen geçerli bir resim dosyası yükleyin.",
    errorLoad: "Ürün yüklenemedi.",
    errorGen: "Stüdyo simülasyonu başarısız oldu. Lütfen tekrar deneyin.",
    credits: "Kredi",
    buyCredits: "Kredi Al",
    noCreditsTitle: "Yetersiz Kredi",
    noCreditsDesc: "Yeni stüdyo seansları başlatmak için krediye ihtiyacınız var.",
    pricingTitle: "Stüdyo Paketleri",
    pricingDesc: "Dijital ürün fotoğrafçılığı için esnek seçenekler.",
    mostPopular: "En Popüler",
    purchase: "Paketi Seç",
    successTitle: "Seans Onaylandı",
    successDesc: "Krediler hesabınıza tanımlandı.",
    loginRequired: "Giriş Yapın",
    loginDesc: "Seanslarınızı yönetmek için giriş yapın.",
    loginBtn: "Giriş Yap / Kayıt Ol",
    logout: "Çıkış",
    welcome: "Hoşgeldin",
    currency: "Para Birimi",
    batchToggle: "Çoklu Sahne Paketi",
    batchDesc: "Tam koleksiyon için tek seferde 5 farklı sahne seçin.",
    providerSelect: "Stüdyo Motoru",
    download: "İndir",
    downloadOptions: "İndirme Seçenekleri",
    studioRecipe: "Stüdyo Reçetesi",
    close: "Kapat",
    footer: {
      privacy: "Gizlilik Politikası",
      terms: "Kullanım Koşulları",
      guide: "Stüdyo Rehberi",
      rights: "Tüm hakları saklıdır."
    },
    policies: {
      privacy: `Akraphy Studio olarak ziyaretçilerimizin gizliliğine öncelik veriyoruz. Bu Gizlilik Politikası belgesi, Akraphy Studio tarafından toplanan ve kaydedilen bilgi türlerini ve bunları nasıl kullandığımızı içerir.

1. Bilgi Toplama
Hizmeti sağlamak amacıyla yalnızca işlenmek üzere yüklenen görselleri topluyoruz. İzniniz olmadan görsellerinizi genel yapay zeka modellerini eğitmek için kullanmayız.

2. Veri Güvenliği
Yüklenen tüm dosyalar güvenli bir şekilde işlenir ve işlem tamamlandıktan sonra geçici sunucularımızdan otomatik olarak silinir.

3. Kullanıcı Hesapları
Adınızı, e-postanızı ve kredi bakiyenizi güvenli bir şekilde saklıyoruz. Kişisel verilerinizi satmayız veya üçüncü taraflarla paylaşmayız.

4. Çerezler
Oturumunuzu ve tercihlerinizi (tema ve dil gibi) sürdürmek için yerel depolama (local storage) kullanıyoruz.`,
      terms: `Akraphy Studio'ya hoş geldiniz! Bu hüküm ve koşullar, Akraphy Studio Web Sitesinin kullanımına ilişkin kuralları ve düzenlemeleri ana hatlarıyla belirtir.

1. Lisans
Aksi belirtilmedikçe, Akraphy Studio ve/veya lisans verenleri Akraphy Studio'daki tüm materyallerin fikri mülkiyet haklarına sahiptir. Platformumuzu kullanarak oluşturduğunuz görsellerin tüm ticari hakları size aittir.

2. Kullanım Sınırları
Hizmetimizi yasa dışı, saldırgan veya zararlı içerik oluşturmak için kullanamazsınız. Bu politikayı ihlal eden kullanıcıları yasaklama hakkımız saklıdır.

3. İade Politikası
Dijital krediler kullanıldıktan sonra iade edilemez. Teknik bir hata yaşarsanız, kredi iadesi için lütfen destek ekibiyle iletişime geçin.

4. Hizmet Kullanılabilirliği
%99,9 çalışma süresi hedefliyoruz ancak bakım veya üçüncü taraf sağlayıcı kesintileri nedeniyle hizmete kesintisiz erişimi garanti etmiyoruz.`
    },
    nav: {
      gallery: "Vitrin",
      pricing: "Paketler",
      help: "Rehber",
      faq: "SSS"
    },
    loadingSteps: [
      "Ürün geometrisi analiz ediliyor...",
      "Orijinal ortam temizleniyor...",
      "Dijital sahne kuruluyor...",
      "Stüdyo ışıkları kalibre ediliyor...",
      "Detaylar işleniyor..."
    ],
    landing: {
      featuresTitle: "Dijital Stüdyo Avantajı",
      features: [
        { title: "Pazaryeri Fiziği", desc: "Amazon ve Instagram standartlarına uygun ortamları simüle edin." },
        { title: "Ray-Traced Gölgeler", desc: "Motorumuz doğal gölge ve yansımalar için 3D geometriyi hesaplar." },
        { title: "Toplu Çekim Modu", desc: "Bir üründen tek seansta beş farklı stüdyo kurulumu elde edin." },
        { title: "Tam Ticari Haklar", desc: "Dışa aktarılan tüm görsellerin ticari hakları size aittir." }
      ],
      comparisonTitle: "Sıradan vs. Stüdyo Kalitesi",
      comparisonDesc: "Sıradan fotoğrafları nasıl yüksek dönüşümlü pazarlama görsellerine dönüştürdüğümüzü görün.",
      faqTitle: "Sıkça Sorulan Sorular",
      faq: [
        { q: "Bu bir görsel üreticisi mi?", a: "Hayır, Akraphy bir Stüdyo Simülatörüdür. Ürününüzün formunu korur ve onu dijital stüdyo ortamına yerleştirir." },
        { q: "Toplu Çekim nedir?", a: "Aynı ürün için 5 farklı sahne seçmenize olanak tanır. Motorumuz hepsini tek seansta işler." },
        { q: "Arkaplan Sil modu nasıl çalışır?", a: "Sadece ürününüzü ortamdan ayırarak şeffaf bir PNG çıktısı hazırlamaya odaklanır." },
        { q: "Sosyal medya için uygun mu?", a: "Kesinlikle! Farklı modlarda içerik üreterek anında sosyal medya koleksiyonları oluşturabilirsiniz." }
      ]
    },
    steps: {
      upload: "İçe Aktar",
      analyze: "Kalibre Et",
      generate: "Simüle Et",
      done: "Dışa Aktar"
    },
    config: {
      categoryTitle: "1. Ürün Kategorisi",
      sceneTitle: "2. Stüdyo Sahnesi",
      lightingTitle: "3. Işık Kurulumu",
      categories: {
        JEWELRY: "Mücevher",
        FASHION: "Moda",
        HANDMADE: "El Yapımı",
        HOME: "Mobilya",
        BEAUTY: "Kozmetik",
        BOOKS: "Kırtasiye",
        TECH: "Elektronik",
        KIDS: "Bebek",
        FOOD: "İçecek",
        AUTOMOTIVE: "Oto"
      },
      scenes: {
        TRANSPARENT: "Arkaplan Sil",
        CLEAN_WHITE: "Saf Beyaz",
        LIFESTYLE_HOME: "Yaşam Alanı",
        LUXURY_DARK: "Premium Koyu",
        OUTDOOR_NATURAL: "Dış Mekan",
        PASTEL_CREATIVE: "Kreatif Pastel",
        CONCRETE_URBAN: "Endüstriyel",
        MARBLE_ELEGANCE: "Mermer Yüzey",
        WOODEN_RUSTIC: "Rustik Ahşap",
        WATER_DYNAMIC: "Su Yansıması",
        VELVET_SOFT: "Yumuşak Kadife"
      },
      lighting: {
        STUDIO_SOFT: "Softbox",
        NATURAL_SUN: "Doğal",
        PROFESSIONAL_CRISP: "Keskin",
        MOODY_DIM: "Atmosferik",
        GOLDEN_HOUR: "Gün Batımı",
        NEON_VIBE: "Cyber Neon",
        RIM_LIGHT: "Kontür"
      }
    },
    packages: {
      free: { name: "Deneme", features: ["2 Ücretsiz Seans", "Standart Kalite", "Temel Destek"] },
      starter: { name: "Başlangıç", features: ["10 Seans", "Yüksek Çözünürlük", "Filigran Yok"] },
      pro: { name: "Profesyonel", features: ["50 Seans", "4K Ultra-HD", "Ticari Lisans", "Öncelikli Destek"] },
      studio: { name: "Stüdyo", features: ["250 Seans", "Toplu İşlem", "Özel Temsilci", "Ticari Haklar"] },
      enterprise: { name: "Kurumsal", features: ["1000+ Seans", "API Erişimi", "Özel Çözümler", "Sınırsız Destek"] }
    },
    onboarding: {
      title: "Akraphy'ye Hoşgeldin",
      subTitle: "Stüdyonuz çekimler için hazır.",
      gift: "Hoşgeldin Hediyesi",
      credits: "Kredi",
      desc: "Hesabınıza ücretsiz deneme kredileri tanımladık. İlk ürününüzü yükleyerek hemen başlayın.",
      btn: "Çekime Başla"
    },
    help: {
      title: "Stüdyo Rehberi",
      subTitle: "3 adımda profesyonel sonuçlar",
      steps: [
        { title: "İçe Aktar", desc: "Net bir ürün fotoğrafı yükleyin." },
        { title: "Yapılandır", desc: "Kategori ve sahneleri seçin." },
        { title: "İşle", desc: "Seansı başlatın ve simülasyonu bekleyin." }
      ],
      tipsTitle: "İpuçları",
      tips: [
        "Vakit kazanmak için Toplu Seans özelliğini kullanın.",
        "Şeffaf PNG'ler için 'Arkaplan Sil' modunu tercih edin.",
        "Gerçekçi gölgeler için ürünün kesilmemiş olduğundan emin olun."
      ],
      btn: "Rehberi Kapat"
    }
  }
};
