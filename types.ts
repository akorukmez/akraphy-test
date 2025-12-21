
export type Language = 'en' | 'tr';
export type Currency = 'TRY' | 'USD' | 'EUR';

export interface User {
  id: string;
  email: string;
  credits: number;
  name: string;
  planName: string; // Added to track user package
  preferredCurrency?: Currency;
}

export enum ProductCategory {
  JEWELRY = 'Jewelry & High-End',
  FASHION = 'Fashion & Apparel',
  HANDMADE = 'Handmade & Craft',
  HOME = 'Home & Furniture',
  BEAUTY = 'Beauty & Cosmetics',
  BOOKS = 'Stationery & Books',
  TECH = 'Consumer Electronics',
  KIDS = 'Toys & Baby',
  FOOD = 'Food & Beverage',
  AUTOMOTIVE = 'Automotive Parts'
}

export enum SceneType {
  CLEAN_WHITE = 'Pure White Studio (E-Commerce Standard)',
  LIFESTYLE_HOME = 'Cozy Home Interior (Lifestyle)',
  LUXURY_DARK = 'Dark Minimalist (Premium)',
  OUTDOOR_NATURAL = 'Outdoor Nature (Organic)',
  PASTEL_CREATIVE = 'Solid Pastel Colors (Creative)',
  CONCRETE_URBAN = 'Concrete Texture (Industrial)',
  MARBLE_ELEGANCE = 'Marble Surface (Luxury)',
  WOODEN_RUSTIC = 'Aged Wood (Rustic)',
  WATER_DYNAMIC = 'Water Ripples (Refreshing)',
  VELVET_SOFT = 'Velvet Fabric (Soft)'
}

export enum LightingType {
  STUDIO_SOFT = 'Softbox Diffusion (Balanced)',
  NATURAL_SUN = 'Natural Window Light (Warm)',
  PROFESSIONAL_CRISP = 'High Key Crisp (Sharp)',
  MOODY_DIM = 'Cinematic Dim (Atmospheric)',
  GOLDEN_HOUR = 'Golden Hour (Sunset Glow)',
  NEON_VIBE = 'Cyber Neon (Futuristic)',
  RIM_LIGHT = 'Rim Highlight (Contour)'
}

export interface ProcessingState {
  isUploading: boolean;
  isProcessing: boolean;
  step: 'idle' | 'uploading' | 'analyzing' | 'generating' | 'completed' | 'error';
  error: string | null;
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
