
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
    aiResult: "Studio Results",
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
    batchToggle: "Batch Mode",
    batchDesc: "Generate multiple scene variations at once.",
    providerSelect: "Studio Engine",
    download: "Download",
    downloadOptions: "Download Options",
    studioRecipe: "Studio Recipe",
    close: "Close",
    newSession: "New Session",
    images: "Images",
    inspect: "Inspect",
    variation: "Variation",
    history: {
        title: "Session History",
        subtitle: "Your past generations are stored locally.",
        empty: "No history yet.",
        emptyDesc: "Start a studio session to see your results here.",
        noResults: "No results found",
        noResultsDesc: "No records match your search criteria.",
        date: "Date",
        delete: "Delete",
        subLabels: {
          upgrade: "Upgrade Plan",
          past: "Past Sessions",
          exit: "End Session"
        },
        searchPlaceholder: "Search category, scene...",
        sortTitle: "Sort By",
        sort: {
            newest: "Newest First",
            oldest: "Oldest First",
            catAZ: "Category (A-Z)",
            catZA: "Category (Z-A)",
            sceneAZ: "Scene (A-Z)",
            sceneZA: "Scene (Z-A)"
        }
    },
    contact: {
      title: "Contact Us",
      subtitle: "We are here to help with any questions or issues.",
      nameLabel: "Name",
      namePlaceholder: "Your Name",
      emailLabel: "Email",
      emailPlaceholder: "your@email.com",
      subjectLabel: "Subject",
      subjects: {
        support: "Technical Support",
        feature: "Feature Request",
        billing: "Billing Issue",
        other: "Other"
      },
      messageLabel: "Message",
      messagePlaceholder: "How can we help you?",
      sendBtn: "Send Message",
      successTitle: "Message Sent",
      successDesc: "We'll get back to you as soon as possible."
    },
    footer: {
      privacy: "Privacy Policy",
      terms: "Terms of Use",
      contact: "Contact Support",
      guide: "Studio Guide",
      rights: "All rights reserved."
    },
    policies: {
      privacy: `At Akraphy Studio, we prioritize the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Akraphy Studio and how we use it.`,
      terms: `Welcome to Akraphy Studio! These terms and conditions outline the rules and regulations for the use of Akraphy Studio's Website.`
    },
    nav: {
      gallery: "Showcase",
      pricing: "Access Plans",
      help: "Guide",
      faq: "FAQ",
      history: "History"
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
      categoryTitle: "1. Product Category",
      sceneTitle: "2. Studio Scene",
      lightingTitle: "3. Lighting Setup",
      ecommerceHint: "E-Commerce Ready",
      categories: {
        jewelry_access: { label: "Jewelry & Access.", desc: "Rings, Necklaces, Watches" },
        cosmetics_care: { label: "Cosmetics & Care", desc: "Perfume, Cream, Serum" },
        small_goods: { label: "Small Goods", desc: "Candles, Mugs, Gifts" },
        tech_access: { label: "Tech & Gadgets", desc: "Headphones, Mouse, Cases" },
        general_universal: { label: "General Product", desc: "Universal Preset" }
      },
      scenes: {
        pure_studio: { label: "Pure Studio", desc: "Clean White/Grey. Professional." },
        dark_premium: { label: "Dark Premium", desc: "Anthracite/Black. Luxury." },
        soft_gradient: { label: "Soft Gradient", desc: "Pastel Tones. Modern & Airy." },
        tabletop_min: { label: "Tabletop Minimal", desc: "Wood/Concrete. Boutique." },
        floating_object: { label: "Floating Object", desc: "Solid Color. 3D Anti-Gravity." },
        transparent_bg: { label: "Transparent", desc: "Solid White. Cutout Ready." }
      },
      lighting: {
        softbox_studio: { label: "Softbox Studio", desc: "Balanced, Soft Shadows (Default)" },
        directional_cont: { label: "Directional Contrast", desc: "Depth, Dramatic Shadows" },
        high_key_clean: { label: "High-Key Clean", desc: "Bright, Homogeneous, Sales Focus" },
        moody_side: { label: "Moody Side Light", desc: "Artistic, Low Key" }
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
      title: "Studio Guide",
      subTitle: "Which setting should you choose?",
      btn: "Close Guide",
      tipsTitle: "Pro Tips",
      tips: [
        "Example: Use 'Pure Studio' for Amazon/Etsy listings.",
        "Example: Use 'Dark Premium' for jewelry to make metals pop.",
        "Example: Use 'Transparent' if you want to use the product in your own designs."
      ],
      steps: [
        { title: "Import", desc: "Upload a clear photo." },
        { title: "Configure", desc: "Select category & scene." },
        { title: "Process", desc: "Get studio results." }
      ],
      guide: {
        catTitle: "Categories",
        sceneTitle: "Scenes",
        lightTitle: "Lighting"
      }
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
    aiResult: "Stüdyo Çıktıları",
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
    logout: "Çıkış Yap",
    welcome: "Hoşgeldin",
    currency: "Para Birimi",
    batchToggle: "Toplu Çekim Modu",
    batchDesc: "Tek seferde 5 farklı stüdyo sahnesi üretin.",
    providerSelect: "Stüdyo Motoru",
    download: "İndir",
    downloadOptions: "İndirme Seçenekleri",
    studioRecipe: "Stüdyo Reçetesi",
    close: "Kapat",
    newSession: "Yeni Seans",
    images: "Görsel",
    inspect: "İncele",
    variation: "Varyasyon",
    history: {
        title: "İşlem Geçmişi",
        subtitle: "Geçmiş üretimleriniz burada saklanır.",
        empty: "Henüz geçmiş yok.",
        emptyDesc: "Burada sonuçlarınızı görmek için bir stüdyo seansı başlatın.",
        noResults: "Sonuç Bulunamadı",
        noResultsDesc: "Arama kriterlerinize uygun kayıt yok.",
        date: "Tarih",
        delete: "Sil",
        subLabels: {
          upgrade: "Planı Yükselt",
          past: "Geçmiş Seanslar",
          exit: "Oturumu Kapat"
        },
        searchPlaceholder: "Kategori, sahne ara...",
        sortTitle: "Sıralama",
        sort: {
            newest: "En Yeni",
            oldest: "En Eski",
            catAZ: "Kategori (A-Z)",
            catZA: "Kategori (Z-A)",
            sceneAZ: "Sahne (A-Z)",
            sceneZA: "Sahne (Z-A)"
        }
    },
    contact: {
      title: "Bize Ulaşın",
      subtitle: "Sorularınız veya istekleriniz için buradayız.",
      nameLabel: "İsim Soyisim",
      namePlaceholder: "Adınız",
      emailLabel: "E-Posta",
      emailPlaceholder: "ornek@email.com",
      subjectLabel: "Konu",
      subjects: {
        support: "Teknik Destek",
        feature: "Özellik İsteği",
        billing: "Ödeme Sorunu",
        other: "Diğer"
      },
      messageLabel: "Mesaj",
      messagePlaceholder: "Size nasıl yardımcı olabiliriz?",
      sendBtn: "Mesajı Gönder",
      successTitle: "Mesaj İletildi",
      successDesc: "En kısa sürede size dönüş yapacağız."
    },
    footer: {
      privacy: "Gizlilik Politikası",
      terms: "Kullanım Koşulları",
      contact: "İletişime Geç",
      guide: "Stüdyo Rehberi",
      rights: "Tüm hakları saklıdır."
    },
    policies: {
      privacy: `Akraphy Studio olarak ziyaretçilerimizin gizliliğine öncelik veriyoruz.`,
      terms: `Akraphy Studio'ya hoş geldiniz! Bu hüküm ve koşullar, Akraphy Studio Web Sitesinin kullanımına ilişkin kuralları ve düzenlemeleri ana hatlarıyla belirtir.`
    },
    nav: {
      gallery: "Vitrin",
      pricing: "Paketler",
      help: "Rehber",
      faq: "SSS",
      history: "Geçmiş"
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
      faqTitle: "Sıkça Sorulan Sosyal Medya Soruları",
      faq: [
        { q: "Bu bir görsel üreticisi mi?", a: "Hayır, Akraphy bir Stüdyo Simülatörüdür. Ürününüzün formunu korur ve onu dijital stüdyo ortamına yerleştirir." },
        { q: "Toplu Çekim nedir?", a: "Aynı ürün için 5 farklı sahne seçmenize olanak tanır. Motorumuz hepsini tek seansta işler." },
        { q: "Genel Ürün seçeneği nedir?", a: "Belirli bir kategoriye girmeyen ürünler için dengeli bir 'Universal' moddur." },
        { q: "Sosyal medya için uygun mu?", a: "Evet! Özellikle 'Soft Gradient' sahne modu Instagram için idealdir." }
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
      lightingTitle: "3. Işık Profili",
      ecommerceHint: "E-Ticaret Uyumlu",
      categories: {
        jewelry_access: { label: "Takı & Aksesuar", desc: "Yüzük, Kolye, Saat, Bileklik" },
        cosmetics_care: { label: "Kozmetik & Bakım", desc: "Parfüm, Krem, Serum, Makyaj" },
        small_goods: { label: "Küçük Ürünler", desc: "Mum, Defter, Fincan, Hediyelik" },
        tech_access: { label: "Teknoloji & Aks.", desc: "Kulaklık, Mouse, Klavye, Kılıf" },
        general_universal: { label: "Genel Ürün", desc: "Universal Preset (Diğer Her Şey)" }
      },
      scenes: {
        pure_studio: { label: "Pure Studio", desc: "Beyaz/Gri Zemin. Temiz, Profesyonel." },
        dark_premium: { label: "Dark Premium", desc: "Siyah/Antrasit. Lüks Algısı." },
        soft_gradient: { label: "Soft Gradient", desc: "Pastel Tonlar. Modern ve Ferah." },
        tabletop_min: { label: "Tabletop Minimal", desc: "Ahşap/Beton. Butik Marka." },
        floating_object: { label: "Floating Object", desc: "Düz Renk. Havada Asılı Ürün, 3D." },
        transparent_bg: { label: "Arkaplanı Sil", desc: "Saf Beyaz Zemin. Dekupe İçin Uygun." }
      },
      lighting: {
        softbox_studio: { label: "Softbox Studio", desc: "Yumuşak, Dağınık Işık (Varsayılan)" },
        directional_cont: { label: "Yönlü Kontrast", desc: "Derinlikli, Belirgin Gölgeler" },
        high_key_clean: { label: "High-Key Clean", desc: "Çok Parlak, Satış Odaklı" },
        moody_side: { label: "Moody Side Light", desc: "Sanatsal, Düşük Yoğunluk" }
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
      title: "Stüdyo Kılavuzu",
      subTitle: "Hangi ayarı seçmelisiniz?",
      btn: "Kılavuzu Kapat",
      tipsTitle: "Profesyonel İpuçları",
      tips: [
        "Örnek: Etsy/Trendyol için 'Pure Studio' sahnesini kullanın.",
        "Örnek: Mücevherlerin parlaması için 'Dark Premium' idealdir.",
        "Örnek: Ürünü başka tasarımda kullanmak için 'Arkaplanı Sil' seçin."
      ],
      steps: [
        { title: "İçe Aktar", desc: "Net bir fotoğraf yükle." },
        { title: "Seç", desc: "Kategori ve sahne seç." },
        { title: "İşle", desc: "Sonucu al." }
      ],
      guide: {
        catTitle: "Kategoriler",
        sceneTitle: "Sahneler",
        lightTitle: "Işıklandırma"
      }
    }
  }
};
