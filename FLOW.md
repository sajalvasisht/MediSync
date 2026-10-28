# MediSync — System Architecture & User Flows

This document details the user journeys, routing topology, request flows, and WebRTC signaling flows for the MediSync telemedicine platform using Mermaid diagrams.

---

## 1. Patient Journey (Search to Prescription)

The primary patient flow takes a user from initial symptom exploration or doctor search through slot booking, simulated payment, virtual consultation, and medical record/prescription delivery.

```mermaid
flowchart TD
    A["Patient Lands on MediSync (/)"] --> B{"Explore Option"}
    B -->|"Option 1"| C["Symptom & Specialist Advisor Quiz"]
    B -->|"Option 2"| D["Direct Search / Doctors Directory (/doctors)"]
    
    C -->|"Get Specialty Recommendation"| D
    D -->|"Filter by Specialty, Fee, City, Rating"| E["Select Specialist Card"]
    E --> F["Doctor Profile & Slot Picker (/doctors/:id)"]
    
    F -->|"Pick Date & Time Slot"| G["Booking & Checkout (/book/:doctorId)"]
    G -->|"Enter Patient Info & Choose Payment"| H["Simulate Payment (Card / UPI)"]
    
    H -->|"Payment Success"| I["Appointment Confirmed Screen"]
    I -->|"Enter Video Waiting Room"| J["Consultation Chamber (/consult/:roomId)"]
    
    J -->|"Device Pre-check (Cam & Mic)"| K["Live Video Consultation"]
    K -->|"Encrypted Stream & Chat"| L["Doctor Completes Call"]
    
    L --> M["Patient Dashboard (/dashboard/patient)"]
    M --> N["View & Download E-Prescription"]
    M --> O["Upload Follow-up Lab Reports to Vault"]
```

---

## 2. Doctor Journey (Workspace & Practice Management)

The clinician journey allows doctors to manage their daily patient appointments, set online availability slots, and review clinical histories.

```mermaid
flowchart TD
    A["Doctor Signs In (/login)"] --> B["Doctor Command Center (/dashboard/doctor)"]
    B --> C{"Management Wings"}
    
    C -->|"Today's Schedule"| D["Review Patient Queue & Chief Complaints"]
    C -->|"Availability Builder"| E["Add or Remove Video Consultation Slots"]
    C -->|"Clinical History"| F["Review Treated Patients & Clinical Notes"]
    
    D -->|"Start Appointment"| G["Join Video Consultation Room (/consult/:roomId)"]
    G --> H["Conduct Live Video Examination"]
    H --> I["Send In-call Clinical Chat Notes"]
    H --> J["Conclude Call & Generate E-Prescription"]
    J --> B
```

---

## 3. Frontend Route Map

The hierarchical route structure of the React application managed by React Router v6.

```mermaid
flowchart LR
    App["App Root"] --> Shell["PageShell (Fixed Pill Navbar + Footer)"]
    
    Shell --> R1["/ (Landing Page)"]
    Shell --> R2["/doctors (Doctor Discovery)"]
    Shell --> R3["/doctors/:id (Doctor Profile & Slots)"]
    Shell --> R4["/book/:doctorId (Checkout & Confirmation)"]
    Shell --> R5["/login (Portal Sign In)"]
    Shell --> R6["/register (Portal Registration)"]
    Shell --> R7["/dashboard/patient (Patient Vault & RX)"]
    Shell --> R8["/dashboard/doctor (Doctor Schedule & Slots)"]
    Shell --> R9["/consult/:roomId (Live Video Studio)"]
    Shell --> R10["* (404 Not Found Page)"]
    
    subgraph Landing Sections
        R1 --> S1["#home (Hero & Orbits)"]
        R1 --> S2["#doctors (Featured Specialist)"]
        R1 --> S3["#treatments (Symptom Advisor Quiz)"]
        R1 --> S4["#results (Before/After Comparer)"]
        R1 --> S5["#contact (Sanctuary Blueprint & Reviews)"]
    end
```

---

## 4. Request Flow (Frontend to Node.js Backend)

The interaction between the React client and the standalone native Node.js HTTP service.

```mermaid
sequenceDiagram
    autonumber
    actor User as Patient Browser
    participant FE as React Frontend (Vite)
    participant API as Node.js HTTP Server (Port 5000)
    participant Handler as Route Handlers & Data

    User->>FE: Navigates to /doctors?specialty=Cardiology
    FE->>FE: Check VITE_USE_REAL_API flag
    
    alt If Real API Enabled
        FE->>API: GET /api/doctors?specialty=Cardiology
        API->>API: router.js checks CORS & RegExp pattern
        API->>Handler: handleGetDoctors(req, res, params, searchParams)
        Handler-->>API: Filtered JSON list
        API-->>FE: HTTP 200 JSON Response + CORS Headers
    else If Mock Data Mode
        FE->>FE: api.js filters local doctors.js dataset
    end
    
    FE-->>User: Renders Filtered Doctor Cards
```

---

## 5. Planned Future WebRTC & Signaling Architecture

The planned peer-to-peer WebRTC consultation architecture for production deployment.

```mermaid
sequenceDiagram
    autonumber
    actor Patient as Patient Peer
    participant Signal as Node/WebSocket Signaling Server
    actor Doctor as Doctor Peer
    participant STUN as STUN / TURN Server

    Patient->>Signal: Join Room (roomId: "room-priya-live")
    Doctor->>Signal: Join Room (roomId: "room-priya-live")
    Signal-->>Patient: "doctor-joined"
    
    Patient->>STUN: Request ICE Candidates
    Patient->>Patient: Create WebRTC PeerConnection & SDP Offer
    Patient->>Signal: Send SDP Offer
    Signal->>Doctor: Forward SDP Offer
    
    Doctor->>STUN: Request ICE Candidates
    Doctor->>Doctor: Set Remote Description & Create SDP Answer
    Doctor->>Signal: Send SDP Answer
    Signal->>Patient: Forward SDP Answer
    
    Patient->>Signal: Exchange ICE Candidates
    Signal->>Doctor: Forward ICE Candidates
    
    Note over Patient,Doctor: Direct P2P Encrypted Audio / Video Stream Established (DTLS/SRTP)
    Patient<<-->>Doctor: 1080p Live Video & Audio Stream
```

---

## 6. Planned Distributed Slot Booking Flow

To prevent double booking across simultaneous telemedicine requests:

```mermaid
flowchart TD
    A["Patient Selects Time Slot"] --> B["Frontend Emits 'slot:hold' Request"]
    B --> C{"Is Slot Already Locked in Redis?"}
    
    C -->|"Yes (Locked)"| D["Show Conflict Notice & Suggest Next Available Slot"]
    C -->|"No (Available)"| E["Set 10-Minute Redis TTL Hold Lock on Slot"]
    
    E --> F["Patient Enters Payment Screen"]
    F --> G{"Payment Succeeded?"}
    
    G -->|"Success"| H["Commit Booking to DB & Release Lock as 'Booked'"]
    G -->|"Timeout / Failure"| I["Redis TTL Expires & Releases Slot to Public"]
```
