/** Case studies for the Before/After Results section */
import hypertensionBefore from '../assets/case-studies/hypertension-before.jpg';
import hypertensionAfter from '../assets/case-studies/hypertension-after.jpg';
import acneBefore from '../assets/case-studies/acne-before.jpg';
import acneAfter from '../assets/case-studies/acne-after.jpg';
import anxietyBefore from '../assets/case-studies/anxiety-before.jpg';
import anxietyAfter from '../assets/case-studies/anxiety-after.jpg';

const caseStudies = [
  {
    id: 'hypertension',
    tab: 'Heart Health Progress',
    eyebrow: 'REMOTE CARE JOURNEY',
    title: 'Heart Health — Stronger Vitals in 8 Weeks',
    subtitle: 'Guided by continuous monitoring, medication adjustments, and weekly video follow-ups with Dr. Sharma.',
    beforeLabel: 'Week 1 — Baseline',
    afterLabel: 'Week 8 — Progress',
    beforeImage: hypertensionBefore,
    afterImage: hypertensionAfter,
    beforeColor: '#c8d8c8',
    afterColor: '#a8c4b0',
    stats: [
      { label: 'Blood Pressure', before: '168/104 mmHg', after: '124/82 mmHg' },
      { label: 'Resting HR',     before: '94 bpm',       after: '72 bpm' },
      { label: 'Energy Levels',  before: 'Low',          after: 'Improved' },
    ],
    description: 'With at-home tracking and consistent teleconsult check-ins, this patient followed a personalized plan and saw steady improvements in key health markers over eight weeks.',
  },
  {
    id: 'acne',
    tab: 'Skin Clarity Journey',
    eyebrow: 'TELEDERMATOLOGY CASE',
    title: 'Acne Care — Visible Skin Clarity in 12 Weeks',
    subtitle: 'Treated with photo-based skin check-ins, progress tracking, and tailored prescriptions by Dr. Mehta.',
    beforeLabel: 'Week 1 — Baseline',
    afterLabel: 'Week 12 — Progress',
    beforeImage: acneBefore,
    afterImage: acneAfter,
    beforeColor: '#d4c4b8',
    afterColor: '#c8d8c8',
    stats: [
      { label: 'Breakouts',      before: 'Frequent',  after: 'Occasional' },
      { label: 'Inflammation',   before: 'High',      after: 'Low' },
      { label: 'Confidence',     before: 'Low',       after: 'High' },
    ],
    description: 'Regular virtual follow-ups and image-based reviews helped fine-tune treatment over time, leading to clearer skin and a simpler day-to-day routine.',
  },
  {
    id: 'anxiety',
    tab: 'Mental Wellness Journey',
    eyebrow: 'VIRTUAL THERAPY PROGRESS',
    title: 'Mental Wellness — Meaningful Progress in 6 Sessions',
    subtitle: 'A structured online therapy programme with check-ins and practical coping tools guided by Dr. Pillai.',
    beforeLabel: 'Session 1 — Baseline',
    afterLabel: 'Session 6 — Progress',
    beforeImage: anxietyBefore,
    afterImage: anxietyAfter,
    beforeColor: '#d0c8d8',
    afterColor: '#b8d4c8',
    stats: [
      { label: 'Stress Levels',   before: 'High',      after: 'Manageable' },
      { label: 'Sleep Quality',   before: 'Poor',      after: 'Better' },
      { label: 'Daily Routine',   before: 'Disrupted', after: 'More stable' },
    ],
    description: 'Through guided virtual sessions and consistent support, this patient built healthier habits and reported improved day-to-day wellbeing over the course of care.',
  },
];

export default caseStudies;
