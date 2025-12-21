
# Akraphy Studio - AI Product Photography Platform

> **"Professional studio-quality images in seconds."**

Akraphy Studio is a specialized AI interface for e-commerce sellers. It transforms ordinary smartphone photos into high-conversion marketing assets in seconds.

## 🌟 Key Features

*   **Smart Studio Modes:** Optimized prompts for niches like Jewelry, Fashion, Beauty, and Tech.
*   **Professional Background Library:** Pure White (marketplace compliant), Lifestyle, Outdoor, Marble, and more.
*   **Realistic Lighting Engine:** AI that understands 3D geometry to cast natural shadows and reflections.
*   **Multi-Format Export:** High-quality downloads in 1:1 (Square), 9:16 (Story), and 4:5 (Portrait) ratios using "Fit & Blur" logic.
*   **User Management:** LocalStorage-based account system with credit tracking and 5 subscription plans.
*   **Multi-language Support:** Full Turkish and English localization.

## 🚀 Quick Start (Test Mode)

The application automatically starts with the **akraphy@akraphy.com** admin user. 
- **Admin Privileges:** Access to the "Studio" plan with 999 credits.
- **Auto-Login:** No registration required for testing.

## 🏗 Technical Architecture

*   **Frontend:** React 19 (TypeScript)
*   **Styling:** Tailwind CSS with a custom Anthracite/Apple design system.
*   **AI Engine:** Integrated via Gemini 2.5 Flash for prompt engineering.
*   **Automation:** n8n Webhook integration for heavy lifting diffusion processing.

## 🔌 n8n Integration

The frontend sends the following JSON payload to the n8n webhook:
```json
{
  "image": "base64_string...",
  "category": "JEWELRY",
  "scene": "CLEAN_WHITE",
  "lighting": "STUDIO_SOFT",
  "prompt": "Full AI system instruction...",
  "timestamp": "ISO-8601"
}
```

---
© 2024 Akraphy Studio. All rights reserved.
