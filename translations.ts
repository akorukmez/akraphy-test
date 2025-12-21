
import { Language } from './types';

export const translations = {
  en: {
    title: "Akraphy Studio",
    subtitle: "AI Product Photography",
    desc: "Create professional studio-quality images for your products in seconds. No equipment needed.",
    poweredBy: "Powered by Akraphy Engine™",
    selectStyle: "Studio Setup",
    uploadTitle: "Upload Photo",
    uploadDesc: "Drag & drop or click to upload",
    originalSource: "Original",
    aiResult: "Generated Image",
    waitingInput: "Ready to Generate",
    waitingDesc: "Upload a product photo to start the transformation.",
    processButton: "Generate Image",
    processing: "Processing...",
    save: "Download",
    errorValidImage: "Please upload a valid image file.",
    errorLoad: "Failed to upload.",
    errorGen: "Generation failed. Please try again.",
    credits: "Credits",
    buyCredits: "Buy Credits",
    noCreditsTitle: "Insufficient Credits",
    noCreditsDesc: "You need more credits to generate images. Choose a plan below.",
    pricingTitle: "Pricing Plans",
    pricingDesc: "Flexible options for sellers of all sizes.",
    mostPopular: "Best Value",
    purchase: "Select Plan",
    successTitle: "Purchase Successful",
    successDesc: "Credits added to your account.",
    loginRequired: "Login Required",
    loginDesc: "Please login to save your work.",
    loginBtn: "Login / Sign Up",
    logout: "Logout",
    welcome: "Welcome",
    currency: "Currency",
    nav: {
      gallery: "Gallery",
      pricing: "Pricing",
      help: "Guide",
      faq: "FAQ"
    },
    loadingSteps: [
      "Analyzing subject...",
      "Removing background...",
      "Generating scene...",
      "Adjusting lighting...",
      "Finalizing details..."
    ],
    landing: {
      featuresTitle: "Why Akraphy?",
      features: [
        { title: "Marketplace Ready", desc: "Create images compliant with Amazon, Shopify, and Instagram standards instantly." },
        { title: "Realistic Lighting", desc: "Our AI understands 3D geometry to cast natural shadows and reflections." },
        { title: "Brand Consistency", desc: "Maintain a consistent visual style across your entire product catalog." },
        { title: "Commercial Use", desc: "You own 100% of the rights to the generated images for your business." }
      ],
      comparisonTitle: "Standard vs Professional",
      comparisonDesc: "See how we transform ordinary phone photos into high-conversion marketing assets.",
      faqTitle: "Frequently Asked Questions",
      faq: [
        { q: "How does Akraphy AI work?", a: "Akraphy uses advanced generative AI models integrated via specialized workflows (n8n). It analyzes your product's geometry and material, then recreates it in a professional studio setting with realistic shadows and reflections." },
        { q: "Is this suitable for high-end e-commerce?", a: "Absolutely. We offer specialized modes for Jewelry, Fashion, and Tech that prioritize macro details and texture accuracy, making them perfect for premium marketplaces like Amazon, Trendyol, or Shopify." },
        { q: "Do I own the rights to the images?", a: "Yes. All images generated through Akraphy Studio come with full commercial usage rights. You can use them in advertisements, social media, and web stores without any attribution." },
        { q: "What kind of photos should I upload?", a: "For best results, upload clear, well-lit photos taken with a smartphone or camera. A neutral background is helpful but not mandatory, as our AI will automatically remove the original background." },
        { q: "How do I get more credits?", a: "You can purchase credit packages directly from the Pricing section. We offer various plans from 'Starter' for small shops to 'Enterprise' for high-volume agencies." },
        { q: "Can I use Akraphy for social media content?", a: "Yes! Our built-in image viewer allows you to download results in various aspect ratios like 9:16 for Stories/Reels or 1:1 for main feeds." }
      ]
    },
    steps: {
      upload: "Upload",
      analyze: "Analyze",
      generate: "Generate",
      done: "Complete"
    },
    config: {
      categoryTitle: "1. Category",
      sceneTitle: "2. Background (Scene)",
      lightingTitle: "3. Lighting (Mood)",
      categories: {
        JEWELRY: "Jewelry & High-End",
        FASHION: "Fashion & Apparel",
        HANDMADE: "Handmade & Craft",
        HOME: "Home & Furniture",
        BEAUTY: "Beauty & Cosmetics",
        BOOKS: "Stationery & Books",
        TECH: "Electronics",
        KIDS: "Baby & Kids",
        FOOD: "Food & Beverage",
        AUTOMOTIVE: "Automotive"
      },
      scenes: {
        CLEAN_WHITE: "Pure White",
        LIFESTYLE_HOME: "Lifestyle Home",
        LUXURY_DARK: "Premium Dark",
        OUTDOOR_NATURAL: "Outdoor Nature",
        PASTEL_CREATIVE: "Creative Pastel",
        CONCRETE_URBAN: "Concrete / Urban",
        MARBLE_ELEGANCE: "Marble Surface",
        WOODEN_RUSTIC: "Rustic Wood",
        WATER_DYNAMIC: "Water Ripple",
        VELVET_SOFT: "Soft Velvet"
      },
      lighting: {
        STUDIO_SOFT: "Studio Soft",
        NATURAL_SUN: "Natural Sunlight",
        PROFESSIONAL_CRISP: "Sharp & Crisp",
        MOODY_DIM: "Dramatic Moody",
        GOLDEN_HOUR: "Golden Hour",
        NEON_VIBE: "Cyber Neon",
        RIM_LIGHT: "Rim Highlight"
      }
    },
    styles: {
      MARBLE_LUXURY: "Marble Luxury",
      WATER_REFLECTION: "Water Reflection",
      MINIMALIST_BEIGE: "Minimalist Beige",
      BLACK_VELVET: "Black Velvet",
      NATURE_STONE: "Nature Stone",
      PASTEL_PINK: "Pastel Pink",
      WOODEN_RUSTIC: "Wooden Rustic",
      GOLDEN_HOUR: "Golden Hour"
    },
    packages: {
      free: { name: "Trial", features: ["2 Free Generations", "Standard Quality", "Basic Support"] },
      starter: { name: "Starter", features: ["10 Generations", "High Resolution", "No Watermark"] },
      pro: { name: "Pro", features: ["50 Generations", "4K Ultra-HD", "Commercial License", "Priority Support"] },
      studio: { name: "Studio", features: ["250 Generations", "Bulk Processing", "Dedicated Manager", "Full Commercial"] },
      enterprise: { name: "Enterprise", features: ["1000+ Generations", "API Access", "Custom AI Models", "White-label Support"] }
    },
    onboarding: {
      title: "Welcome to Akraphy",
      subTitle: "Your product photography studio is ready.",
      gift: "Welcome Gift",
      credits: "Credits",
      desc: "We've added free credits to your account. Upload your first product to see the magic.",
      btn: "Start Creating"
    },
    help: {
      title: "How to Use",
      subTitle: "Get professional results in 3 steps",
      steps: [
        { title: "Upload Photo", desc: "Upload a clear photo of your product. A neutral background works best." },
        { title: "Select Style", desc: "Choose the product category and the desired background style from the panel." },
        { title: "Generate", desc: "Click the Generate button. The AI will place your product in the selected scene." }
      ],
      tipsTitle: "Best Practices",
      tips: [
        "Ensure the product is in focus and well-lit.",
        "Avoid cutting off parts of the product in the original photo.",
        "Use 'Pure White' for marketplace listings."
      ],
      btn: "Close Guide"
    }
  },
  tr: {
    title: "Akraphy Studio",
    subtitle: "Yapay Zeka Ürün Fotoğrafçılığı",
    desc: "Ürünleriniz için saniyeler içinde profesyonel stüdyo görselleri oluşturun. Ekipman gerekmez.",
    poweredBy: "Powered by Akraphy Engine™",
    selectStyle: "Stüdyo Ayarları",
    uploadTitle: "Fotoğraf Yükle",
    uploadDesc: "Sürükle bırak veya tıklayarak seç",
    originalSource: "Orijinal",
    aiResult: "Üretilen Görsel",
    waitingInput: "Oluşturmaya Hazır",
    waitingDesc: "Dönüşümü başlatmak için bir ürün fotoğrafı yükleyin.",
    processButton: "Görseli Oluştur",
    processing: "Oluşturuluyor...",
    save: "İndir",
    errorValidImage: "Lütfen geçerli bir resim dosyası yükleyin.",
    errorLoad: "Yükleme başarısız.",
    errorGen: "Oluşturma başarısız oldu.",
    credits: "Kredi",
    buyCredits: "Kredi Al",
    noCreditsTitle: "Yetersiz Kredi",
    noCreditsDesc: "Yeni görsel oluşturmak için krediye ihtiyacınız var.",
    pricingTitle: "Fiyatlandırma",
    pricingDesc: "Her ölçekteki satıcı için uygun seçenekler.",
    mostPopular: "En Popüler",
    purchase: "Planı Seç",
    successTitle: "İşlem Başarılı",
    successDesc: "Krediler hesabınıza tanımlandı.",
    loginRequired: "Giriş Yapın",
    loginDesc: "Çalışmalarınızı kaydetmek için giriş yapın.",
    loginBtn: "Giriş / Kayıt Ol",
    logout: "Çıkış",
    welcome: "Hoşgeldin",
    currency: "Para Birimi",
    nav: {
      gallery: "Galeri",
      pricing: "Paketler",
      help: "Rehber",
      faq: "SSS"
    },
    loadingSteps: [
      "Ürün taranıyor...",
      "Arkaplan temizleniyor...",
      "Sahne oluşturuluyor...",
      "Işık ayarlanıyor...",
      "Detaylar işleniyor..."
    ],
    landing: {
      featuresTitle: "Neden Akraphy?",
      features: [
        { title: "Pazaryeri Uyumlu", desc: "Trendyol, Amazon ve Instagram standartlarına uygun görselleri anında üretin." },
        { title: "Gerçekçi Işık", desc: "Yapay zekamız, ürününüzün geometrisini anlayarak doğal gölge ve yansımalar oluşturur." },
        { title: "Marka Tutarlılığı", desc: "Tüm ürün kataloğunuzda tutarlı bir görsel dil ve kalite standardı sağlayın." },
        { title: "Ticari Kullanım", desc: "Oluşturulan görsellerin tüm ticari hakları işletmenize aittir." }
      ],
      comparisonTitle: "Standart vs Profesyonel",
      comparisonDesc: "Sıradan telefon fotoğraflarını nasıl yüksek dönüşümlü pazarlama görsellerine dönüştürdüğümüzü görün.",
      faqTitle: "Sıkça Sorulan Sorular",
      faq: [
        { q: "Akraphy AI nasıl çalışır?", a: "Akraphy, gelişmiş üretken yapay zeka modellerini özel iş akışları (n8n) üzerinden kullanır. Ürününüzün geometrisini ve dokusunu analiz eder, ardından profesyonel stüdyo ortamında gerçekçi ışık ve gölgelerle yeniden oluşturur." },
        { q: "Lüks segment ürünler için uygun mu?", a: "Evet. Özellikle Mücevher, Saat ve Kozmetik gibi alanlar için makro detayları ve yansımaları ön plana çıkaran özel modlarımız bulunmaktadır." },
        { q: "Görsellerin kullanım hakları kime ait?", a: "Akraphy Studio ile oluşturulan tüm görsellerin tam ticari kullanım hakları size aittir. Sosyal medya, reklam ve e-ticaret sitelerinizde dilediğiniz gibi kullanabilirsiniz." },
        { q: "Nasıl fotoğraflar yüklemeliyim?", a: "En iyi sonuçlar için telefonunuzla çektiğiniz net ve iyi ışıklandırılmış fotoğraflar yeterlidir. Yapay zekamız orijinal arkaplanı temizleyip ürünü yeni ortama yerleştirir." },
        { q: "Kredi sisteminiz nasıl çalışıyor?", a: "Her görsel üretimi 1 kredi harcar. Deneme paketi ile başlayabilir, ihtiyacınıza göre Başlangıç, Profesyonel veya Kurumsal paketlerimizden kredi satın alabilirsiniz." },
        { q: "Sosyal medya için uygun formatlar var mı?", a: "Görsel görüntüleyici üzerinden sonuçları Hikaye/Reels (9:16), Kare (1:1) veya Dikey (4:5) gibi popüler e-ticaret ve sosyal medya formatlarında indirebilirsiniz." }
      ]
    },
    steps: {
      upload: "Yükle",
      analyze: "Analiz",
      generate: "Oluştur",
      done: "Tamamla"
    },
    config: {
      categoryTitle: "1. Kategori",
      sceneTitle: "2. Arkaplan (Sahne)",
      lightingTitle: "3. Işık (Mood)",
      categories: {
        JEWELRY: "Mücevher & Takı",
        FASHION: "Moda & Giyim",
        HANDMADE: "El Yapımı",
        HOME: "Ev & Dekorasyon",
        BEAUTY: "Kozmetik & Bakım",
        BOOKS: "Kitap & Kırtasiye",
        TECH: "Elektronik",
        KIDS: "Anne & Bebek",
        FOOD: "Yiyecek & İçecek",
        AUTOMOTIVE: "Otomotiv"
      },
      scenes: {
        CLEAN_WHITE: "Saf Beyaz",
        LIFESTYLE_HOME: "Yaşam Alanı",
        LUXURY_DARK: "Premium Koyu",
        OUTDOOR_NATURAL: "Dış Mekan",
        PASTEL_CREATIVE: "Kreatif Pastel",
        CONCRETE_URBAN: "Beton / Endüstriyel",
        MARBLE_ELEGANCE: "Mermer Yüzey",
        WOODEN_RUSTIC: "Rustik Ahşap",
        WATER_DYNAMIC: "Su Yansıması",
        VELVET_SOFT: "Yumuşak Kadife"
      },
      lighting: {
        STUDIO_SOFT: "Stüdyo Soft",
        NATURAL_SUN: "Doğal Günışığı",
        PROFESSIONAL_CRISP: "Keskin & Net",
        MOODY_DIM: "Dramatik Loş",
        GOLDEN_HOUR: "Altın Saat",
        NEON_VIBE: "Cyber Neon",
        RIM_LIGHT: "Kontür Işığı"
      }
    },
    styles: {
      MARBLE_LUXURY: "Mermer Lüks",
      WATER_REFLECTION: "Su Yansıması",
      MINIMALIST_BEIGE: "Minimalist Bej",
      BLACK_VELVET: "Siyah Kadife",
      NATURE_STONE: "Doğal Taş",
      PASTEL_PINK: "Pastel Pembe",
      WOODEN_RUSTIC: "Ahşap Rustik",
      GOLDEN_HOUR: "Altın Saat"
    },
    packages: {
      free: { name: "Deneme", features: ["2 Ücretsiz Görsel", "Standart Kalite", "Temel Destek"] },
      starter: { name: "Başlangıç", features: ["10 Görsel", "Yüksek Çözünürlük", "Filigran Yok"] },
      pro: { name: "Profesyonel", features: ["50 Görsel", "4K Ultra-HD", "Ticari Lisans", "Öncelikli Destek"] },
      studio: { name: "Stüdyo", features: ["250 Görsel", "Toplu İşlem", "Özel Temsilci", "Ticari Haklar"] },
      enterprise: { name: "Kurumsal", features: ["1000+ Görsel", "API Erişimi", "Özel Model Eğitimi", "Sınırsız Destek"] }
    },
    onboarding: {
      title: "Akraphy'ye Hoşgeldin",
      subTitle: "Ürün fotoğrafçılığı stüdyonuz hazır.",
      gift: "Hoşgeldin Hediyesi",
      credits: "Kredi",
      desc: "Hesabınıza ücretsiz deneme kredileri tanımladık. İlk ürününüzü yükleyerek hemen başlayın.",
      btn: "Görsel Oluştur"
    },
    help: {
      title: "Nasıl Kullanılır?",
      subTitle: "3 adımda profesyonel sonuçlar",
      steps: [
        { title: "Fotoğraf Yükle", desc: "Ürününüzün net bir fotoğrafını yükleyin. Düz bir zemin daha iyi sonuç verir." },
        { title: "Tarzını Seç", desc: "Panelden ürün kategorisini ve istediğiniz arkaplan tarzını seçin." },
        { title: "Oluştur", desc: "Oluştur butonuna basın. Yapay zeka ürününüzü seçilen sahneye yerleştirecektir." }
      ],
      tipsTitle: "İpuçları",
      tips: [
        "Ürünün net ve iyi ışık almış olmasına dikkat edin.",
        "Orijinal fotoğrafta ürünün kesilmemiş olması önemlidir.",
        "Pazaryeri satışları için 'Saf Beyaz' modunu kullanın."
      ],
      btn: "Kılavuzu Kapat"
    }
  }
};
