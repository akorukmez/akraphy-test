
import { GalleryItem, ProductCategory, SceneType, LightingType } from '../types';

/**
 * Landing Page Comparison Slider Data
 */
export const LANDING_COMPARISON = {
  before: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800",
  after: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800",
  category: ProductCategory.JEWELRY,
  scene: SceneType.CLEAN_WHITE,
  lighting: LightingType.STUDIO_SOFT
};

/**
 * Showcase Gallery Items
 * You can update these links and settings here.
 */
export const SHOWCASE_ITEMS: GalleryItem[] = [
  {
    id: '1',
    title: "Luxury Diamond Ring",
    beforeImage: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800",
    afterImage: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800",
    category: ProductCategory.JEWELRY,
    scene: SceneType.MARBLE_ELEGANCE,
    // Fix: Corrected property name from rim_LIGHT to RIM_LIGHT and removed extra space
    lighting: LightingType.RIM_LIGHT
  },
  {
    id: '2',
    title: "Premium Perfume Bottle",
    beforeImage: "https://images.unsplash.com/photo-1594035910387-fea4779426e9?auto=format&fit=crop&q=80&w=800",
    afterImage: "https://images.unsplash.com/photo-1594035910387-fea4779426e9?auto=format&fit=crop&q=80&w=800",
    category: ProductCategory.BEAUTY,
    scene: SceneType.WATER_DYNAMIC,
    lighting: LightingType.NATURAL_SUN
  },
  {
    id: '3',
    title: "Minimalist Smart Watch",
    beforeImage: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=800",
    afterImage: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=800",
    category: ProductCategory.TECH,
    scene: SceneType.PASTEL_CREATIVE,
    lighting: LightingType.PROFESSIONAL_CRISP
  },
  {
    id: '4',
    title: "Organic Skincare Set",
    beforeImage: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&q=80&w=800",
    afterImage: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&q=80&w=800",
    category: ProductCategory.BEAUTY,
    scene: SceneType.WOODEN_RUSTIC,
    lighting: LightingType.GOLDEN_HOUR
  },
  {
    id: '5',
    title: "Urban Sneakers",
    beforeImage: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=800",
    afterImage: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=800",
    category: ProductCategory.FASHION,
    scene: SceneType.CONCRETE_URBAN,
    lighting: LightingType.RIM_LIGHT
  },
  {
    id: '6',
    title: "Designer Handbag",
    beforeImage: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800",
    afterImage: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800",
    category: ProductCategory.FASHION,
    scene: SceneType.LUXURY_DARK,
    lighting: LightingType.MOODY_DIM
  },
  {
    id: '7',
    title: "Handmade Ceramic",
    beforeImage: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=800",
    afterImage: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=800",
    category: ProductCategory.HANDMADE,
    scene: SceneType.VELVET_SOFT,
    lighting: LightingType.STUDIO_SOFT
  },
  {
    id: '8',
    title: "Artisan Coffee Beans",
    beforeImage: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=800",
    afterImage: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=800",
    category: ProductCategory.FOOD,
    scene: SceneType.OUTDOOR_NATURAL,
    lighting: LightingType.GOLDEN_HOUR
  }
];
