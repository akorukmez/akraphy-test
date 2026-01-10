
import { GalleryItem, ProductCategory, SceneType, LightingType } from '../types';

/**
 * Landing Page Comparison Slider Data
 */
export const LANDING_COMPARISON = {
  before: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800",
  after: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800",
  category: ProductCategory.JEWELRY,
  scene: SceneType.PURE_STUDIO,
  lighting: LightingType.SOFTBOX
};

/**
 * Showcase Gallery Items
 * Updated to match new MVP Enums
 */
export const SHOWCASE_ITEMS: GalleryItem[] = [
  {
    id: '1',
    title: "Luxury Diamond Ring",
    beforeImage: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800",
    afterImage: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800",
    category: ProductCategory.JEWELRY,
    scene: SceneType.DARK_PREMIUM,
    lighting: LightingType.DIRECTIONAL
  },
  {
    id: '2',
    title: "Premium Perfume",
    beforeImage: "https://images.unsplash.com/photo-1594035910387-fea4779426e9?auto=format&fit=crop&q=80&w=800",
    afterImage: "https://images.unsplash.com/photo-1594035910387-fea4779426e9?auto=format&fit=crop&q=80&w=800",
    category: ProductCategory.COSMETICS,
    scene: SceneType.SOFT_GRADIENT,
    lighting: LightingType.HIGH_KEY
  },
  {
    id: '3',
    title: "Smart Watch",
    beforeImage: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=800",
    afterImage: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=800",
    category: ProductCategory.TECH,
    scene: SceneType.PURE_STUDIO,
    lighting: LightingType.SOFTBOX
  },
  {
    id: '4',
    title: "Organic Cream",
    beforeImage: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&q=80&w=800",
    afterImage: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&q=80&w=800",
    category: ProductCategory.COSMETICS,
    scene: SceneType.TABLETOP_MINIMAL,
    lighting: LightingType.MOODY
  },
  {
    id: '5',
    title: "Urban Headphones",
    beforeImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800",
    afterImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800",
    category: ProductCategory.TECH,
    scene: SceneType.DARK_PREMIUM,
    lighting: LightingType.DIRECTIONAL
  },
  {
    id: '6',
    title: "Handmade Mug",
    beforeImage: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=800",
    afterImage: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=800",
    category: ProductCategory.SMALL_GOODS,
    scene: SceneType.TABLETOP_MINIMAL,
    lighting: LightingType.SOFTBOX
  },
  {
    id: '7',
    title: "Gift Candle",
    beforeImage: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=800",
    afterImage: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=800",
    category: ProductCategory.SMALL_GOODS,
    scene: SceneType.SOFT_GRADIENT,
    lighting: LightingType.HIGH_KEY
  },
  {
    id: '8',
    title: "Universal Product",
    beforeImage: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
    afterImage: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
    category: ProductCategory.GENERAL,
    scene: SceneType.PURE_STUDIO,
    lighting: LightingType.SOFTBOX
  }
];
