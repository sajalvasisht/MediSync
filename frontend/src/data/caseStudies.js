/** Case studies for the Before/After Results section */

const caseStudies = [
  {
    id: 'hypertension',
    tab: 'Hypertension Management',
    eyebrow: 'CLINICAL CASE STUDY',
    title: 'Stage 2 Hypertension — Controlled in 8 Weeks',
    subtitle: 'Patient treated using MediSync continuous monitoring, e-prescription, and weekly video follow-ups with Dr. Sharma.',
    beforeLabel: 'Week 1 — Before',
    afterLabel: 'Week 8 — After',
    // Using gradient placeholders in place of real images
    beforeColor: '#c8d8c8',
    afterColor: '#a8c4b0',
    stats: [
      { label: 'BP Readings', before: '168/104 mmHg', after: '124/82 mmHg' },
      { label: 'Resting HR',  before: '94 bpm',       after: '72 bpm' },
      { label: 'Anxiety',     before: 'Severe',        after: 'Mild' },
    ],
    description: 'Through a structured 8-week teleconsultation programme combining medication titration, lifestyle coaching, and weekly check-ins, the patient achieved full blood pressure control without a single hospital visit.',
  },
  {
    id: 'acne',
    tab: 'Severe Acne Clearance',
    eyebrow: 'CLINICAL CASE STUDY',
    title: 'Cystic Acne — Significant Clearance in 12 Weeks',
    subtitle: 'Patient treated using photographic skin assessment, AI-assisted tracking, and e-prescription by Dr. Mehta.',
    beforeLabel: 'Week 1 — Before',
    afterLabel: 'Week 12 — After',
    beforeColor: '#d4c4b8',
    afterColor: '#c8d8c8',
    stats: [
      { label: 'Active Lesions', before: '37 lesions', after: '3 lesions' },
      { label: 'Inflammation',   before: 'Severe',     after: 'Minimal' },
      { label: 'Self-Confidence',before: 'Low',        after: 'High' },
    ],
    description: 'Using high-resolution image uploads for each consultation, Dr. Mehta precisely tracked acne progression and adjusted the treatment plan fortnightly, achieving near-complete clearance entirely via teleconsult.',
  },
  {
    id: 'anxiety',
    tab: 'Anxiety Recovery',
    eyebrow: 'CLINICAL CASE STUDY',
    title: 'Generalised Anxiety Disorder — Meaningful Recovery',
    subtitle: 'Structured 6-session CBT programme conducted via MediSync video calls with Dr. Pillai.',
    beforeLabel: 'Session 1',
    afterLabel: 'Session 6',
    beforeColor: '#d0c8d8',
    afterColor: '#b8d4c8',
    stats: [
      { label: 'GAD-7 Score', before: '18 (Severe)', after: '6 (Mild)' },
      { label: 'Sleep Quality',before: 'Poor',       after: 'Good' },
      { label: 'Daily Function',before: 'Impaired',  after: 'Restored' },
    ],
    description: 'Six structured CBT sessions conducted entirely online, tailored to the patient\'s schedule, resulted in a clinically significant reduction in anxiety scores and a full return to normal daily functioning.',
  },
];

export default caseStudies;
