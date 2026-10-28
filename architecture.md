## Technical Stack & Component Breakdown

### 1. Frontend & Interactive Visualization
* **Framework:** Next.js / React (TypeScript)
* **Mapping Engine:** Mapbox GL JS / Leaflet for dynamic polygon rendering and hazard boundary overlays.
* **UI Components:** Tailwind CSS for high-contrast, responsive dashboard components optimized for field emergency operation centers.

### 2. Backend & Data Processing Pipeline
* **API Service:** Python (FastAPI) handling live data fetching, spatial intersections, and routing calculations[cite: 1].
* **Environmental Data Feeds:**
  * NOAA Buoy & NWS Hazard Alerts API[cite: 1]
  * USGS Streamflow & Seismic Gauges[cite: 1]
* **Static Datasets:** Census ACS 5-Year estimates (Census-tract resolution) formatted for CMIST (Communication, Medical Needs, Independence, Supervision, Transportation) frameworks[cite: 1].

### 3. AI Engine & Zero-Hallucination Guardrails
* **RAG Pipeline:** Vector embeddings stored in FAISS / Qdrant.
* **Knowledge Constraints:** The LLM prompt context is strictly bounded to parsed text from official Hawaii State Emergency Management Agency (HI-EMA) Standard Operating Procedures.
* **Deterministic Fallback:** If an SOP reference cannot be retrieved with > 85% confidence, the model refrains from generating procedural recommendations and flags the gap.

---

## Reliability & Performance Safeguards
* **Caching Layer:** Local GeoJSON and response caching to maintain client rendering in degraded connectivity environments.
* **Modular Services:** Data ingestion, spatial mapping, and AI query services operate independently to eliminate single points of failure during high-traffic emergency events.
