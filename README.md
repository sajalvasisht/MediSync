# MediSync — Telemedicine & Doctor Appointment Platform

> An elegant, patient-centric telemedicine platform with instant video consults, interactive symptom advisement, sliding clinical case comparisons, doctor discovery, appointment booking, and encrypted health record vaults.

MediSync's design replicates an ultra-clean, serene organic healthcare aesthetic: warm off-white tones (`#F7F8F4`), near-black charcoal accents (`#1C2420`), soothing sage green touches (`#6B8F71`), serif editorial typography (Playfair Display), and monospace eyebrow badges (JetBrains Mono).

---

## ✦ Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Prerequisites](#prerequisites)
- [Installation & Running](#installation--running)
  - [1. Backend Setup](#1-backend-setup)
  - [2. Frontend Setup](#2-frontend-setup)
- [Environment Variables](#environment-variables)
- [Available Routes & Endpoints](#available-routes--endpoints)
  - [Frontend Routes](#frontend-routes)
  - [Backend API Endpoints](#backend-api-endpoints)
- [Future Roadmap](#future-roadmap)

---

## Project Overview

MediSync connects patients directly with verified clinical specialists for secure video consultations. Designed with a calming sanctuary aesthetic, the interface removes clinical anxiety and provides intuitive interactions such as:
- A 2-question **Symptom & Specialist Advisor** quiz with personalized care path recommendations.
- An **Interactive Clinical Before/After Comparer** with draggable slider handle.
- A **Virtual Clinic Blueprint Explorer** showing clinic architecture, consultation chambers, and privacy shields.
- Comprehensive doctor search, multi-filter discovery, time slot picker, and mock payment checkout.
- Simulated video consultation room with waiting room pre-check, encrypted video tiles, chat panel, and controls.

---

## Key Features

1. **Floating Pill Navbar with Scroll-Spy**:
   - Fixed sticky pill navbar matching reference screenshots.
   - Live scroll-spy tracking: updates active dark pill as user scrolls through sections (`Studio`, `Doctor`, `Treatments`, `Before & After`, `Contact & Booking`).
2. **Serene Hero Experience**:
   - Editorial typography with italic serif and sage green accent phrase.
   - Glassmorphism phone container simulating an active consultation.
   - Floating patient testimonial card and 360-degree rotating circular text badge.
3. **Symptom & Specialist Advisor**:
   - 2-step interactive quiz mapping clinical concerns and symptom onset to recommended medical specializations.
   - Instant filtering link directly into Doctor discovery.
4. **Interactive Clinical Outcome Comparer**:
   - Dual-layer before/after visual comparison with smooth draggable divider handle and keyboard support.
   - Clinical case study tabs (`Hypertension`, `Severe Acne`, `Anxiety Recovery`) with metric progression.
5. **Interactive Virtual Clinic Blueprint & Care Hub**:
   - Dashed SVG floor plan with clickable zone pins (HD Studio, Secure Messaging, Health Vault, Privacy Shield).
   - Real-time synchronized detail cards beneath.
   - Aligned consultation hours and emergency concierge direct contact info.
6. **Patient Review Submission & Testimonials**:
   - Interactive star rating picker and client testimonial publishing flow.
7. **Doctor Discovery & Filtering**:
   - Multi-dimensional filters: Specialisation, city, language, maximum fee, and minimum star rating.
8. **Doctor Profile & Slot Picker**:
   - Full physician credentials, hospital affiliations, education, and date/slot picker.
9. **Booking & Checkout Flow**:
   - Patient details, fee breakdown, and simulated payment methods (Card, UPI, Net Banking).
10. **Teleconsultation Studio (`/consult/:roomId`)**:
    - Pre-call waiting room with camera and microphone hardware checks.
    - Live video studio with remote doctor video, local self-preview PiP, encrypted live chat drawer, and call timer.
11. **Patient & Doctor Dashboards**:
    - Patient portal: Scheduled visits, medical records vault with document upload, and e-prescriptions.
    - Doctor workspace: Today's patient queue, interactive slot builder, and clinical history.

---

## Tech Stack

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite 5
- **Routing**: React Router v6
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Typography**: Playfair Display (Serif display), Inter (Body), JetBrains Mono (Badges & Eyebrows)
- **Styling**: Vanilla CSS with strict CSS custom properties (`tokens.css`, `global.css`)

### Backend (Minimal Node.js Stub)
- **Runtime**: Plain Node.js (Built-in `http` module only)
- **Dependencies**: Zero external dependencies (No Express, no database, no ORM)
- **Architecture**: Hand-written modular regex router, CORS headers, JSON request/response handlers

---

## Folder Structure

```
telemedicine-platform/
├── README.md                      # Project guide, features, and setup
├── FLOW.md                        # User journeys, route map & Mermaid diagrams
├── EXPLANATION.md                 # Architecture, design decisions & code breakdown
├── .gitignore
│
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   ├── .env.example
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── config/
│       │   └── brand.js           # Central brand variables (name, phone, links)
│       ├── styles/
│       │   ├── tokens.css         # CSS design variables (colors, fonts, radii, shadows)
│       │   └── global.css         # Global resets, utility classes, and keyframes
│       ├── hooks/
│       │   ├── useScrollSpy.js    # IntersectionObserver active section tracker
│       │   └── useInView.js       # Viewport trigger hook
│       ├── data/
│       │   ├── doctors.js         # Mock doctors directory
│       │   ├── slots.js           # Doctor date & time availability
│       │   ├── quiz.js            # Advisor questions & specialty mapping
│       │   ├── caseStudies.js     # Before/After case data & metrics
│       │   ├── blueprintZones.js  # Blueprint floor plan zones
│       │   ├── testimonials.js    # Patient reviews data
│       │   └── navLinks.js        # Navbar link items & section IDs
│       ├── services/
│       │   └── api.js             # Thin API service (switches mock vs backend)
│       ├── components/
│       │   ├── layout/            # Navbar, Footer, PageShell
│       │   ├── common/            # Button, Card, Badge, Rating, Tabs
│       │   ├── landing/           # Hero, FeaturedDoctor, Advisor, BeforeAfterSlider, Blueprint, Reviews, SanctuarySection
│       │   └── consult/           # VideoTile, ChatPanel, Controls
│       └── pages/
│           ├── Landing/           # Pixel-faithful landing page
│           ├── Doctors/           # Doctor discovery with multi-filters
│           ├── DoctorProfile/     # Doctor credentials & interactive slot picker
│           ├── Booking/           # Booking & simulated payment checkout
│           ├── Auth/              # Login & Register UI
│           ├── Dashboard/         # Patient and Doctor dashboards
│           ├── Consult/           # Teleconsultation waiting room & video studio
│           └── NotFound/          # Custom 404 page
│
└── backend/
    ├── package.json
    ├── .env.example
    └── src/
        ├── server.js              # Native Node http.createServer
        ├── router.js              # Hand-written regex router with CORS
        ├── handlers/
        │   └── index.js           # Root, health, and doctors API handlers
        ├── data/
        │   └── doctors.js         # Static doctor database
        └── utils/
            ├── cors.js            # CORS header utilities
            └── response.js        # JSON response & error helpers
```

---

## Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

---

## Installation & Running

### 1. Backend Setup

The backend uses **native Node.js only** with no `npm install` needed!

```bash
cd backend

# Start the Node HTTP server (default port 5000)
node src/server.js

# Or start in watch mode for development:
npm run dev
```

The backend will be running at `http://localhost:5000`.

Test endpoints:
- `http://localhost:5000/`
- `http://localhost:5000/api/health`
- `http://localhost:5000/api/doctors`
- `http://localhost:5000/api/doctors/1`

### 2. Frontend Setup

In a separate terminal:

```bash
cd frontend

# Install dependencies (React, Vite, Framer Motion, Lucide)
npm install

# Start Vite dev server (port 5173)
npm run dev

# Or build for production
npm run build
```

The application will be live at `http://localhost:5173`.

---

## Environment Variables

### Frontend (`frontend/.env`)
```ini
# Port for Vite dev server (default: 5173)
VITE_PORT=5173

# Set to 'true' to proxy doctor calls to the Node.js backend
VITE_USE_REAL_API=false

# API base path (proxied by Vite to http://localhost:5000)
VITE_API_BASE=/api
```

### Backend (`backend/.env`)
```ini
PORT=5000
NODE_ENV=development
```

---

## Available Routes & Endpoints

### Frontend Routes
| Route | Description |
|---|---|
| `/` | Landing page (Hero, Featured Doctor, Advisor, Before & After, Sanctuary Blueprint & Reviews) |
| `/doctors` | Specialist discovery with search, specialty pills, fee slider, rating & city filters |
| `/doctors/:id` | Doctor profile with interactive date & slot picker |
| `/book/:doctorId` | Multi-step booking checkout with simulated payment (Card, UPI, Net Banking) |
| `/login` | Authentication sign-in portal (Patient & Doctor roles) |
| `/register` | Account registration portal |
| `/dashboard/patient` | Patient portal: Appointments, Health Vault report upload, E-prescriptions |
| `/dashboard/doctor` | Clinician workspace: Daily queue, Slot availability builder, Patient history |
| `/consult/:roomId` | Video consultation chamber with pre-call waiting room, PiP video, live chat & controls |
| `*` | Custom styled 404 error page |

### Backend API Endpoints
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | API status and root greeting |
| `GET` | `/api/health` | Service uptime and timestamp |
| `GET` | `/api/doctors` | List all doctors (supports query filter `?specialty=...`) |
| `GET` | `/api/doctors/:id` | Get single doctor by ID or returns 404 |

---

## Future Roadmap

1. **Production Backend Architecture**:
   - Transition to Express.js or Fastify with TypeScript.
   - MongoDB / PostgreSQL database for persistent patient profiles, doctor records, and audit trails.
2. **Real-time WebRTC Video & Audio**:
   - WebSocket / Socket.io signaling server for SDP offer/answer exchanges and ICE candidate pooling.
   - Turn/Stun server integration (e.g. Twilio or self-hosted coturn) for reliable NAT traversal.
3. **Real Payment Gateway**:
   - Stripe / Razorpay Webhooks integration for real-time payment verification and instant invoice generation.
4. **Clinical Authentication & RBAC**:
   - JWT tokens with HTTP-only cookies, OAuth 2.0 (Google, Apple), and Multi-Factor Authentication (MFA).
5. **HIPAA & DPDP Compliance**:
   - Encrypted AWS S3 buckets for diagnostic files with time-limited signed URLs.
   - Comprehensive audit logging for all medical record access.
