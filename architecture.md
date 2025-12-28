
# Akraphy Studio Technical Blueprint

This document outlines the technical architecture of Akraphy Studio. It is intended for backend developers (n8n designers) to understand exactly what data they will receive and how the frontend functions.

## 1. System Overview

Akraphy Studio follows a **Thick Client** architecture. 
- **Frontend Responsibilities:** User Authentication (Mock), Credit Management, **Prompt Engineering**, Image Pre-processing (Base64), and Result Visualization.
- **Backend Responsibilities (n8n):** Image-to-Image processing (Stable Diffusion/Flux), file storage, and returning the result.

## 2. Service Layer Architecture

### A. `geminiService.ts` ( The Director)
This service acts as the "Studio Director". It does not generate the image directly when n8n mode is active; instead, it generates the **Instructions**.
- **Input:** Category, Scene, Lighting, Angle.
- **Output:** A highly detailed text prompt.
- **Logic:** It concatenates specific photography keywords (e.g., "Infinity cove", "Softbox diffusion", "Macro details") based on UI selections.

### B. `n8nService.ts` (The Courier)
This service handles the communication with your backend.
- **Action:** Orchestrates the payload assembly.
- **Context Injection:** It injects the `user` object into the payload. This allows the backend to implement logic like:
  - *If Plan == 'Enterprise', use High-Res Model.*
  - *If Plan == 'Free', add watermark.*

### C. `authService.ts` & `historyService.ts` (The State)
- **Persistence:** Uses Browser `localStorage` to persist user session and generation history.
- **Keys:**
  - `jewelai_users`: Stores user objects, credits, and plans.
  - `jewelai_history`: Stores the last 50 generated images and their metadata.

## 3. Data Interface Specification (Backend Contract)

The n8n workflow **MUST** accept the following JSON schema.

### Request Object (`POST`)

| Field | Type | Description |
| :--- | :--- | :--- |
| `image` | `string` | Raw Base64 string of the uploaded file (header stripped). |
| `prompt` | `string` | The final, engineered prompt constructed by the Frontend. |
| `timestamp` | `string` | ISO string of request time. |
| `config` | `Object` | Technical configuration of the shot. |
| `config.category` | `string` | Enum: `JEWELRY`, `FASHION`, `HOME`, etc. |
| `config.scene` | `string` | Enum: `CLEAN_WHITE`, `LIFESTYLE_HOME`, etc. |
| `config.lighting` | `string` | Enum: `STUDIO_SOFT`, `NEON_VIBE`, etc. |
| `config.variation` | `string` | Angle label (e.g., "Front Standard"). |
| `user` | `Object` | **Critical for Logic.** User context. |
| `user.id` | `string` | User ID. |
| `user.email` | `string` | User Email. |
| `user.plan` | `string` | Plan Name (`Free Trial`, `Starter`, `Pro`, `Studio`, `Enterprise`). |
| `user.credits` | `number` | Current credit balance. |
| `client` | `Object` | Client metadata. |
| `client.language` | `string` | `en` or `tr`. |

### Response Object

The backend can return any of the following keys; the frontend checks them in this order:
1. `output_url` (Public URL)
2. `url`
3. `image_url`
4. `image` (Base64)
5. `data` (Base64)
6. `output`

## 4. Execution Flow (Batch Mode)

When a user selects "Batch Mode" (e.g., 3 scenes selected):
1. The Frontend calculates total operations (e.g., 3 Scenes * 5 Angles = 15 Generations).
2. It iterates through the selected scenes.
3. For each angle variation, it constructs a unique `prompt`.
4. It calls `processWithN8n` individually for each variation.
5. **Note:** The frontend handles the loop. The backend receives single requests sequentially (or in parallel depending on network).

## 5. Security & Limitations
- **Auth:** Currently mocked via LocalStorage. In a production backend, validate the `user.id` or add an API Key header in `n8nService.ts`.
- **CORS:** The n8n webhook must allow CORS from the frontend domain (or `*`).
