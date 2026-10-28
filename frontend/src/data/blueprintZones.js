/** Blueprint zones for the Virtual Clinic Explorer */
import { Video, MessageCircle, FileText, Shield, Clock, Heart } from 'lucide-react';

const blueprintZones = [
  {
    id: 'video',
    label: 'HD Video Studio',
    icon: 'Video',
    position: { top: '30%', left: '25%' },
    title: 'HD Video Consultation Room',
    description: 'Crystal-clear 1080p video calls with end-to-end encryption. Our adaptive bitrate technology ensures smooth consultations even on 4G connections. No app download required — just click and connect.',
  },
  {
    id: 'chat',
    label: 'Secure Messaging',
    icon: 'MessageCircle',
    position: { top: '55%', left: '65%' },
    title: 'Secure Messaging Hub',
    description: 'HIPAA-compliant encrypted messaging for sharing symptoms, reports, and updates with your doctor. Messages are stored in your personal health vault for future reference.',
  },
  {
    id: 'records',
    label: 'Health Records Vault',
    icon: 'FileText',
    position: { top: '35%', left: '68%' },
    title: 'Personal Health Records Vault',
    description: 'Upload lab reports, imaging scans, and prescriptions. Your doctor accesses a complete longitudinal health history before every consultation — no repeating your story.',
  },
  {
    id: 'security',
    label: 'Privacy Shield',
    icon: 'Shield',
    position: { top: '70%', left: '30%' },
    title: 'End-to-End Privacy Shield',
    description: 'All consultations are encrypted at rest and in transit. We comply with India\'s Digital Personal Data Protection Act and global HIPAA standards. Your health data belongs to you.',
  },
  {
    id: 'schedule',
    label: '24/7 Scheduling',
    icon: 'Clock',
    position: { top: '20%', left: '55%' },
    title: '24/7 Smart Scheduling',
    description: 'Book appointments at any hour. Our AI-powered scheduler shows real-time availability and can suggest the next available slot within your preferred time window across multiple specialists.',
  },
  {
    id: 'monitoring',
    label: 'Health Monitoring',
    icon: 'Heart',
    position: { top: '65%', left: '50%' },
    title: 'Continuous Health Monitoring',
    description: 'Connect wearables and health devices to share real-time vitals with your doctor. BP, glucose, SpO2 — all streamed securely into your consultation dashboard for informed decisions.',
  },
];

export default blueprintZones;
