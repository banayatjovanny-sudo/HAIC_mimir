Markdown
---
name: Bug Reports & Fixes
about: Resolved issues regarding RAG context hallucination and live NOAA API rate-limiting
title: '[FIXED] AI SOP Retrieval Fallback & Live NOAA Feed Rate-Limiting Overhead'
labels: 'bug, rag, api-resilience, resolved'
assignees: 'banayatjovanny-sudo, timothy-tunick'
---

## 🐛 Bug 1: Unanchored AI Recommendations on Unmatched SOP Queries

### Description
When a user asked the AI assistant an emergency query that did not directly match indexed text in the State EMA Standard Operating Procedures (SOPs), the LLM defaulted to general pre-trained knowledge, creating a risk of inaccurate procedural advice during emergency drills.

### Steps to Reproduce (Pre-Fix)
1. Open the Mimir AI Assistant panel on the dashboard.
2. Enter an out-of-scope query (e.g., *"How do we handle radioactive fallout at non-designated shelters?"*).
3. **Observed Behavior:** The model generated unverified general advice without explicit grounding in official Hawaii EMA documents.

### Resolution & Fix Applied
* **Strict Cosine Distance Thresholding:** Implemented a strict similarity score cut-off ($> 0.82$) in the FAISS vector retrieval pipeline.
* **Deterministic Fallback Prompting:** If retrieved SOP context falls below the confidence threshold, the AI strictly responds: *"No official State EMA SOP found for this scenario. Please contact County EOC directly."*
* **Citation Guardrails:** Enforced mandatory source-tagging in system prompts so every response explicitly cites the exact HI-EMA document section used.

---

## 🐛 Bug 2: Live NOAA/NWS API Rate-Limiting Causing Dashboard Timeouts

### Description
During rapid map updates or multi-user access, repeated direct calls to the live NOAA weather and NWS hazard alert endpoints hit API rate limits (HTTP 429 Too Many Requests), causing the hazard map layer to freeze or fail to load entirely.

### Steps to Reproduce (Pre-Fix)
1. Load the interactive GIS dashboard.
2. Trigger multiple rapid hazard refresh cycles across all island views within 30 seconds.
3. **Observed Behavior:** The map layer failed to update, throw HTTP 429 errors in the browser console, and blanked out live weather alerts.

### Resolution & Fix Applied
* **Backend Caching & Throttling Layer:** Implemented an in-memory Redis/FastAPI cache layer that pulls live NOAA/NWS feeds on a background worker loop every 60 seconds instead of firing raw client-side requests.
* **Stale-While-Revalidate Fallback:** Configured the frontend map to render cached local hazard GeoJSON if the external network connection drops or external APIs fail to respond within 2.0 seconds.
* **Batch Spatial Querying:** Aggregated individual polygon data requests into a single unified backend API response to minimize HTTP
