# MediSync — Engineering & Architectural Explanation

A comprehensive, beginner-friendly guide explaining the technical design, architectural patterns, component mechanics, and plain Node.js server implementation of MediSync.

---

## ✦ Table of Contents

1. [Architectural Philosophy & Design Decisions](#1-architectural-philosophy--design-decisions)
2. [Design Tokens & Styling System](#2-design-tokens--styling-system)
3. [Folder & File Walkthrough](#3-folder--file-walkthrough)
4. [Component Deep Dives](#4-component-deep-dives)
   - [Scroll-Spy Pill Navbar](#a-scroll-spy-pill-navbar)
   - [Interactive Before/After Clinical Comparer](#b-interactive-beforeafter-clinical-comparer)
   - [Symptom & Specialist Advisor Quiz](#c-symptom--specialist-advisor-quiz)
   - [Interactive Blueprint Floor Plan](#d-interactive-blueprint-floor-plan)
5. [The Plain Node.js Backend Stub](#5-the-plain-nodejs-backend-stub)
   - [How the Hand-Written Router Works](#how-the-hand-written-router-works)
   - [Handling CORS Manually](#handling-cors-manually)
   - [How to Add New Endpoints](#how-to-add-new-endpoints)
6. [State Management & Mock Service Layer](#6-state-management--mock-service-layer)

---

## 1. Architectural Philosophy & Design Decisions

### Why Vanilla CSS + Strict Design Tokens over Heavy UI Frameworks?
The reference UI has a bespoke, high-end organic aesthetic (Playfair serif italics, soft sage gradients, specific card radii of 24–36px, and floating pill geometry). Standard component libraries (MUI, Bootstrap, AntD) bring heavy default styling that fights against custom editorial layouts. Using native CSS variables (`tokens.css`) paired with modern layout techniques (CSS Grid, Flexbox, `clamp()`, and backdrop-filter) provides:
- **Zero bundle bloat**: No unused framework styles.
- **Pixel-level precision**: Direct control over padding, shadows, line-heights, and responsive shifts.
- **Effortless theming**: Brand changes can be executed in seconds via `tokens.css` and `brand.js`.

### Why Native Node.js `http` for the Backend?
For a frontend-first architecture, adding heavy frameworks like Express, Mongoose, or Prisma before the frontend API contract is stabilized adds maintenance overhead. A zero-dependency Node.js server using only `http`:
- Starts instantaneously with zero build step.
- Requires no `npm install` for the backend.
- Demonstrates clean fundamental understanding of HTTP protocols: URL parsing, HTTP method matching, status codes, and manual CORS headers.

---

## 2. Design Tokens & Styling System

All design values are extracted from the reference screenshots into `src/styles/tokens.css` as CSS Custom Properties:

```css
:root {
  /* Warm off-white background with soft sage tint */
  --color-bg: #F7F8F4;
  --color-bg-secondary: #EEF0EA;

  /* Editorial dark charcoal / near-black */
  --color-primary: #1C2420;
  --color-primary-hover: #2C3830;

  /* Calming sage green accents */
  --color-sage: #6B8F71;
  --color-sage-light: #8FAF95;
  --color-sage-pale: #DCE8DE;

  /* Typography scale */
  --font-display: 'Playfair Display', Georgia, serif;
  --font-body: 'Inter', -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Card and Pill geometry */
  --radius-pill: 999px;
  --radius-card: 28px;
  --shadow-card: 0 8px 40px rgba(28, 36, 32, 0.08);
}
```

### Font Pairing Logic:
1. **Playfair Display**: Used for headlines with `font-style: italic`. Conveys medical pedigree, calm luxury, and artisanal precision. An embedded phrase uses normal weight in sage green (e.g. `<span className="hero__headline-accent">expert doctors</span>`).
2. **Inter**: Used for body copy, paragraphs, and form inputs for crisp readability across mobile and desktop.
3. **JetBrains Mono**: Used for eyebrows, metadata tags, status pills, and time counters to give a technical, clinical feel.

---

## 3. Folder & File Walkthrough

### Root Level
- `README.md`: Setup instructions, feature summary, and project roadmap.
- `FLOW.md`: Visual user journeys and technical sequence diagrams.
- `EXPLANATION.md`: This file — engineering explanations and architecture decisions.

### Frontend (`frontend/src/`)
- `config/brand.js`: Central configuration holding the company name, phone, emails, and links. Change this one file to rebrand the entire platform.
- `hooks/useScrollSpy.js`: Custom hook using the browser `IntersectionObserver` API to track which section is currently on screen for the floating navbar.
- `data/`: Modular JavaScript files containing realistic mock datasets:
  - `doctors.js`: Doctor credentials, specializations, ratings, fees.
  - `slots.js`: Date-wise and time-wise appointment availability.
  - `quiz.js`: Multi-step questions and clinical outcome mapping.
  - `caseStudies.js`: Before/after clinical measurements and summaries.
  - `blueprintZones.js`: Floor plan zones with titles and descriptions.
  - `testimonials.js`: Patient reviews and ratings.
- `components/layout/`:
  - `Navbar.jsx` / `Navbar.css`: Fixed floating pill navigation with scroll-spy and mobile drawer.
  - `Footer.jsx` / `Footer.css`: Deep charcoal footer with brand column and social links.
  - `PageShell.jsx`: Persistent wrapper containing Navbar, `<Outlet />`, and Footer.
- `components/landing/`:
  - `Hero.jsx`: Main landing hero with phone frame, floating testimonial, and rotating text badge.
  - `FeaturedDoctor.jsx`: Director profile highlight linked to the `#doctors` nav anchor.
  - `Advisor.jsx`: 2-step clinical quiz card.
  - `BeforeAfterSlider.jsx`: Interactive dual-layer image comparison slider.
  - `Blueprint.jsx`: SVG floor plan with interactive zone pins.
  - `Reviews.jsx`: Review submission form and live review feed.
  - `SanctuarySection.jsx`: Wrapper section unifying Blueprint and Reviews.
- `pages/`:
  - `Landing/LandingPage.jsx`: Assembles all landing sections.
  - `Doctors/DoctorsPage.jsx`: Discovery directory with search and multi-filtering.
  - `DoctorProfile/DoctorProfilePage.jsx`: Doctor credentials, bio, and slot picker.
  - `Booking/BookingPage.jsx`: Multi-step booking flow and mock payment.
  - `Auth/`: `LoginPage.jsx` and `RegisterPage.jsx` for patient and doctor portal access.
  - `Dashboard/`: `PatientDashboard.jsx` (vault + e-prescriptions) and `DoctorDashboard.jsx` (daily queue + slot builder).
  - `Consult/ConsultRoom.jsx`: Hardware test waiting room + live consultation studio.
  - `NotFound/NotFoundPage.jsx`: Custom 404 handler.

---

## 4. Component Deep Dives

### a. Scroll-Spy Pill Navbar
**How it works**:
In `src/hooks/useScrollSpy.js`, an `IntersectionObserver` observes each section ID (`#home`, `#doctors`, `#treatments`, `#results`, `#contact`). 
- When a section crosses a top margin threshold (`rootMargin: "-80px 0px -60% 0px"`), its ID is saved to React state.
- `Navbar.jsx` compares `activeId === link.id`. If true, it attaches the `.navbar__pill-item--active` CSS class, turning that link into a filled dark charcoal pill.
- When on secondary pages (like `/doctors`), `useScrollSpy` is bypassed and regular React Router route matching takes over.

### b. Interactive Before/After Clinical Comparer
**How it works**:
In `src/components/landing/BeforeAfterSlider.jsx`:
- Two visual layers are stacked in CSS using absolute positioning:
  - **Base Layer (After)**: Represents the treated clinical outcome.
  - **Clipped Layer (Before)**: Represents baseline symptoms, clipped using CSS `clip-path: inset(0 [100 - sliderPos]% 0 0)`.
- A vertical divider line with an arrow pill handle is positioned at `left: [sliderPos]%`.
- Event listeners (`onMouseMove`, `onTouchMove`) calculate the mouse/touch position relative to the container width:
  ```javascript
  const updatePosition = (clientX) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clamped = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPos(clamped);
  };
  ```
- Accessible keyboard controls (`ArrowLeft`, `ArrowRight`) allow keyboard-only navigation.

### c. Symptom & Specialist Advisor Quiz
**How it works**:
In `src/components/landing/Advisor.jsx`:
- An interactive 2-question state machine.
- Clicking an option tile saves the answer and triggers a smooth slide animation using Framer Motion's `<AnimatePresence mode="wait">`.
- When both questions are answered, the combined key (e.g. `heart_sudden` or `skin_ongoing`) looks up the mapped outcome in `src/data/quiz.js`.
- The result view recommends a medical specialization, presents an explanatory care summary, and renders a direct search button (`/doctors?specialty=Cardiology`).

### d. Interactive Blueprint Floor Plan
**How it works**:
In `src/components/landing/Blueprint.jsx`:
- An SVG renders dashed room outlines simulating an architectural floor plan.
- Clickable pin buttons are positioned absolutely via percentage coordinates (`top`, `left`).
- Clicking any pin activates its state (`activeZoneId`), which transforms the pin into a dark filled circle and animates the corresponding detail card below using Framer Motion.

---

## 5. The Plain Node.js Backend Stub

The backend at `backend/src/server.js` uses standard Node.js without Express or external frameworks.

### How the Hand-Written Router Works
In `backend/src/router.js`, a route table stores route patterns:
```javascript
const routes = [
  { method: 'GET', pattern: '/', handler: handleRoot },
  { method: 'GET', pattern: '/api/health', handler: handleHealth },
  { method: 'GET', pattern: /^\/api\/doctors\/(?<id>[^/]+)$/, handler: handleGetDoctor },
  { method: 'GET', pattern: '/api/doctors', handler: handleGetDoctors },
];
```
- **Static Strings**: Matched using direct string equality (`route.pattern === pathname`).
- **Dynamic Parameterized Routes**: Matched using regular expressions with named capture groups (`(?<id>[^/]+)`). When matched, Node captures `id` and passes it directly to the handler as `params.id`.

### Handling CORS Manually
In `backend/src/utils/cors.js`, headers are manually set on the `http.ServerResponse`:
```javascript
function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}
```
If an HTTP `OPTIONS` preflight request is detected, the server returns HTTP 204 No Content immediately.

### How to Add New Endpoints
1. Create a new handler in `backend/src/handlers/index.js`:
   ```javascript
   function handleGetSpecialties(req, res) {
     sendJSON(res, 200, ['Cardiology', 'Dermatology', 'Pediatrics']);
   }
   ```
2. Register the path in `backend/src/router.js`:
   ```javascript
   { method: 'GET', pattern: '/api/specialties', handler: handleGetSpecialties }
   ```

---

## 6. State Management & Mock Service Layer

In `frontend/src/services/api.js`, a thin abstraction layer decouples UI components from the underlying data source:

```javascript
const USE_REAL_API = import.meta.env.VITE_USE_REAL_API === 'true';

export const getDoctors = async (filters = {}) => {
  if (!USE_REAL_API) {
    // Synchronously filter local JavaScript mock data
    return mockDoctors.filter(...);
  }
  // Otherwise, fetch from the Node.js API server
  return apiFetch(`/doctors?${params}`);
};
```

This ensures:
1. The frontend works **100% out of the box** without running any backend.
2. Turning on `VITE_USE_REAL_API=true` seamlessly routes requests through Vite's reverse proxy to `http://localhost:5000/api/doctors`.
3. When transitioning to a production backend (e.g. Express/MongoDB), only `services/api.js` needs adjustments.
