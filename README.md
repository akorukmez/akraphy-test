
# Akraphy Studio - AI Product Photography Platform

> **"Professional studio-quality images in seconds."**

Akraphy Studio is a specialized AI interface for e-commerce sellers. It transforms ordinary smartphone photos into high-conversion marketing assets by acting as a "Digital Studio Director".

## 🌟 Key Features

*   **Hybrid AI Architecture:** Uses local logic to construct complex prompts (acting as the photographer) and sends them to n8n for high-fidelity rendering.
*   **Batch Photography Mode:** Capability to generate up to 5 different scenes in a single session request.
*   **Smart Context:** Automatic prompt engineering for specific niches (Jewelry, Fashion, Tech) based on user selection.
*   **User & Credit System:** LocalStorage-based simulation of a SaaS platform with different tiers (Free, Starter, Pro, Studio, Enterprise).
*   **History & Persistence:** auto-saves generation history and user credits locally.
*   **Multi-language:** Full support for English and Turkish.

## 🏗 Technical Stack

*   **Frontend:** React 19 (TypeScript)
*   **Build Tool:** Vite / ESR Modules
*   **Styling:** Tailwind CSS (Custom "Anthracite" Dark Mode & "Apple" Light Mode)
*   **State Management:** React Hooks + LocalStorage
*   **Icons:** Lucide-React
*   **AI Integration:**
    *   **Prompt Engine:** `geminiService.ts` (Client-side Logic)
    *   **Generation Engine:** n8n Webhook Integration

## 🔌 Backend Integration (n8n)

The application is designed to offload heavy image processing to an n8n workflow. The frontend handles the "thinking" (Prompt Engineering), and the backend handles the "doing" (Diffusion).

### Webhook Payload Specification

When a user initiates a session, the following JSON is POSTed to the n8n webhook:

```json
{
  "image": "base64_string_without_header...",
  "prompt": "STÜDYO SİMÜLASYONU: Profesyonel Ürün Çekimi. KATEGORİ: Jewelry... [Full engineered prompt]",
  "timestamp": "2024-05-20T10:30:00.000Z",
  "config": {
    "category": "JEWELRY",
    "scene": "CLEAN_WHITE",
    "lighting": "STUDIO_SOFT",
    "variation": "Front Standard"
  },
  "user": {
    "id": "user_12345",
    "email": "user@example.com",
    "name": "John Doe",
    "plan": "Pro",
    "credits": 45
  },
  "client": {
    "language": "en",
    "userAgent": "Mozilla/5.0..."
  }
}
```

### Response Expected
The backend should return a JSON object containing the processed image url or base64:
```json
{
  "output_url": "https://..." 
  // OR 
  "data": "base64_string..."
}
```

## 🚀 Quick Start (Dev Mode)

1.  **Auto-Login:** The app initializes with `akraphy@akraphy.com` (Admin / Studio Plan) for immediate testing.
2.  **Engine Toggle:** You can switch between "Gemini Studio" (Client-side mock/generation) and "n8n Webhook" via the toggle in the UI.

---
© 2024 Akraphy Studio. All rights reserved.
