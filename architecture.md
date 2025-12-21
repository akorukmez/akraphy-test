
# Akraphy Studio Technical Architecture (Blueprint)

This document serves as both a human-readable guide and a technical blueprint for AI-assisted development (Cursor/Bolt/Neo).

## 1. Core Structure
Akraphy Studio is a React 19 SPA. It follows a modular design pattern where UI, Business Logic (Services), and Data are clearly separated.

## 2. Technical Stack
- **Framework:** React 19 (TypeScript).
- **Icons:** Lucide-React.
- **Styling:** Tailwind CSS (Anthracite/Apple System).
- **Backend:** n8n Webhook (`https://n8n-cb9h.onrender.com/webhook-test/e9725b70-543e-4419-97dc-a4c1b4666463`).
- **Storage:** Browser LocalStorage for persistence.

## 3. Data Flow & AI Pipeline
1.  **Capture:** Image is read via `FileReader` and converted to Base64.
2.  **Engineering:** `geminiService.ts` translates user selections into technical photography terminology.
3.  **Communication:** `n8nService.ts` sends the payload.
4.  **Transformation:** n8n processes the image (Inpainting/Outpainting) and returns the modified result.
5.  **Result Viewer:** `ImageViewer.tsx` handles dynamic canvas resizing to provide multiple social media formats without distortion.

## 4. Component Hierarchy
- **App.tsx:** Global state, Header (User Info/Credits), Navigation (Gallery > Pricing > Guide).
- **StyleSelector.tsx:** Grid-based selection for studio parameters.
- **LandingSections.tsx:** High-level marketing sections (Features, Comparison Slider, FAQ).
- **ShowcaseGallery.tsx:** Metadata-driven gallery showing "Recipes" (translated dynamically).
- **PricingModal.tsx / PricingSection.tsx:** Centered 5-package subscription system.

## 5. Visual Standards (For AI Generators)
- **Rounded Corners:** `rounded-[2rem]` (32px) for main containers.
- **Glassmorphism:** `backdrop-blur-xl` with semi-transparent overlays (`/80`).
- **Color Palette:**
  - Dark Mode: `#0B1120` (Background), `#151e32` (Cards).
  - Highlights: Apple Blue (`#0066CC`), Pure White, and Sharp Black.

## 6. Logic Persistence (AuthService)
- No actual backend server is required for this demo.
- `authService.ts` simulates a database.
- Credits are deducted on the client side upon successful image generation.

---
*Reference for AI-driven development - Akraphy Studio v1.1*
