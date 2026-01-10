
export type Language = 'en' | 'tr';
export type Currency = 'TRY' | 'USD' | 'EUR';
export type ProcessingProvider = 'gemini' | 'n8n';

export enum UserPlanType {
  FREE = 'free',
  STARTER = 'starter',
  PRO = 'pro',
  STUDIO = 'studio',
  ENTERPRISE = 'enterprise'
}

export interface PlanFeatures {
  maxBatchSize: number;
  highResOutput: boolean;
  removeWatermark: boolean;
  priorityProcessing: boolean;
  commercialLicense: boolean;
  apiAccess: boolean;
}

export interface User {
  id: string;
  email: string;
  credits: number;
  name: string;
  planName: string;
  planType: UserPlanType;
  features: PlanFeatures;
  preferredCurrency?: Currency;
}

// MVP UPDATE: 5 Specific Categories
export enum ProductCategory {
  JEWELRY = 'jewelry_access',      // Takı & Aksesuar
  COSMETICS = 'cosmetics_care',    // Kozmetik & Kişisel Bakım
  SMALL_GOODS = 'small_goods',     // Küçük E-Ticaret Ürünleri
  TECH = 'tech_access',            // Teknoloji & Aksesuar
  GENERAL = 'general_universal'    // Genel Ürün
}

// MVP UPDATE: 6 Universal Scenes (Added Transparent)
export enum SceneType {
  PURE_STUDIO = 'pure_studio',         // Beyaz/Gri, Katalog
  DARK_PREMIUM = 'dark_premium',       // Siyah/Antrasit, Lüks
  SOFT_GRADIENT = 'soft_gradient',     // Pastel Degrade
  TABLETOP_MINIMAL = 'tabletop_min',   // Ahşap/Beton, Butik
  FLOATING_OBJECT = 'floating_object', // Havada, Modern 3D
  TRANSPARENT = 'transparent_bg'       // Dekupe, Arkaplan Sil
}

// MVP UPDATE: 4 Lighting Profiles
export enum LightingType {
  SOFTBOX = 'softbox_studio',          // Default, Dengeli
  DIRECTIONAL = 'directional_cont',    // Yönlü, Derinlik
  HIGH_KEY = 'high_key_clean',         // Parlak, Satış Odaklı
  MOODY = 'moody_side'                 // Sanatsal, Butik
}

export interface ProcessingState {
  isUploading: boolean;
  isProcessing: boolean;
  step: 'idle' | 'uploading' | 'analyzing' | 'generating' | 'completed' | 'error';
  error: string | null;
  batchProgress?: { current: number; total: number };
}

export interface CreditPackage {
  id: string;
  name: string;
  credits: number;
  prices: Record<Currency, number>;
  popular?: boolean;
  features: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  beforeImage: string;
  afterImage: string;
  category: ProductCategory;
  scene: SceneType;
  lighting: LightingType;
}

export interface HistoryItem {
  id: string;
  timestamp: string;
  imageUrl: string;
  category: ProductCategory;
  scene: SceneType;
  lighting: LightingType;
  variation: string;
}
