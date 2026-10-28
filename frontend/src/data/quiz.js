/** Symptom & Specialist Advisor quiz data */

export const quizQuestions = [
  {
    id: 'q1',
    counter: 'QUESTION 1 OF 2',
    question: 'What is your primary health concern?',
    options: [
      { id: 'heart',   title: 'Heart & Chest',    sub: 'Cardiology / Pulmonology' },
      { id: 'skin',    title: 'Skin & Hair',       sub: 'Dermatology / Trichology' },
      { id: 'mental',  title: 'Mental Wellness',   sub: 'Psychiatry / Psychology' },
      { id: 'general', title: 'General Health',    sub: 'Internal Medicine / GP' },
    ],
  },
  {
    id: 'q2',
    counter: 'QUESTION 2 OF 2',
    question: 'How would you describe the onset of your symptoms?',
    options: [
      { id: 'sudden',  title: 'Sudden & Acute',    sub: 'Urgent / Emergency' },
      { id: 'ongoing', title: 'Ongoing & Chronic',  sub: 'Lifestyle / Management' },
      { id: 'check',   title: 'Routine Check-up',   sub: 'Preventive Care' },
      { id: 'followup',title: 'Follow-up Care',     sub: 'Post-treatment / Review' },
    ],
  },
];

export const quizResults = {
  heart_sudden:   { specialty: 'Cardiology',       desc: 'Speak with a cardiologist urgently. Video consult available now.' },
  heart_ongoing:  { specialty: 'Cardiology',       desc: 'A cardiologist can help manage chronic heart conditions.' },
  heart_check:    { specialty: 'General Medicine', desc: 'Start with a general physician for a preventive heart screening.' },
  heart_followup: { specialty: 'Cardiology',       desc: 'Book a follow-up with your cardiologist to track progress.' },
  skin_sudden:    { specialty: 'Dermatology',      desc: 'A dermatologist can assess sudden rashes or allergic reactions.' },
  skin_ongoing:   { specialty: 'Dermatology',      desc: 'Chronic skin conditions benefit from a dedicated dermatologist.' },
  skin_check:     { specialty: 'Dermatology',      desc: 'Annual skin health checks help detect issues early.' },
  skin_followup:  { specialty: 'Dermatology',      desc: 'Follow up with your dermatologist to review your skin care plan.' },
  mental_sudden:  { specialty: 'Psychiatry',       desc: 'A psychiatrist can help you work through acute mental health events.' },
  mental_ongoing: { specialty: 'Psychiatry',       desc: 'Ongoing therapy with a psychiatrist can significantly improve wellbeing.' },
  mental_check:   { specialty: 'Psychology',       desc: 'A routine mental wellness check is a great act of self-care.' },
  mental_followup:{ specialty: 'Psychiatry',       desc: 'Continue your mental health journey with a regular follow-up.' },
  general_sudden: { specialty: 'General Medicine', desc: 'A GP can quickly diagnose and treat most acute illnesses.' },
  general_ongoing:{ specialty: 'General Medicine', desc: 'Your GP can manage ongoing conditions and refer to specialists.' },
  general_check:  { specialty: 'General Medicine', desc: 'Regular health check-ups are the foundation of preventive care.' },
  general_followup:{ specialty: 'General Medicine',desc: 'Follow up with your GP to review test results or treatment plans.' },
};
