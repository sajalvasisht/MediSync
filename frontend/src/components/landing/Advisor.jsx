import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ArrowRight, RotateCcw, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { quizQuestions, quizResults } from '../../data/quiz';
import './Advisor.css';

const Advisor = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const handleSelectOption = (questionId, optionId) => {
    const updated = { ...answers, [questionId]: optionId };
    setAnswers(updated);

    if (currentStep < quizQuestions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Calculate result
      const key = `${updated.q1}_${updated.q2}`;
      const rec = quizResults[key] || {
        specialty: 'General Medicine',
        desc: 'We recommend speaking with a general physician for an initial comprehensive assessment.',
      };
      setResult(rec);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setResult(null);
  };

  const q = quizQuestions[currentStep];

  return (
    <section className="advisor-section" id="treatments" aria-label="Symptom and Specialist Advisor">
      <div className="advisor-container">
        <div className="advisor-card">
          {/* Left panel */}
          <div className="advisor-card__left">
            <div className="advisor-card__icon-badge" aria-hidden="true">
              <HelpCircle size={22} />
            </div>
            <h2 className="advisor-card__title">
              Symptom &amp; Specialist Advisor
            </h2>
            <p className="advisor-card__desc">
              Not sure which specialist matches your exact health concerns? Answer 2 simple questions to find your personalized clinical path.
            </p>
          </div>

          {/* Right question / result card */}
          <div className="advisor-card__right">
            <AnimatePresence mode="wait">
              {!result ? (
                <motion.div
                  key={`step-${currentStep}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="advisor-question-box"
                >
                  <div className="advisor-counter">{q.counter}</div>
                  <h3 className="advisor-question">{q.question}</h3>

                  <div className="advisor-options-grid">
                    {q.options.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        className="advisor-option-tile"
                        onClick={() => handleSelectOption(q.id, opt.id)}
                      >
                        <span className="advisor-option-title">{opt.title}</span>
                        <span className="advisor-option-sub">{opt.sub}</span>
                      </button>
                    ))}
                  </div>

                  {currentStep > 0 && (
                    <button
                      type="button"
                      className="advisor-back-btn"
                      onClick={() => setCurrentStep(prev => prev - 1)}
                    >
                      ← Previous Question
                    </button>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="advisor-result-box"
                >
                  <div className="advisor-counter">RECOMMENDED CARE PATH</div>
                  <div className="advisor-result-badge">
                    <CheckCircle2 size={18} className="advisor-result-check" />
                    <span>Specialist Match Identified</span>
                  </div>
                  <h3 className="advisor-result-specialty">{result.specialty}</h3>
                  <p className="advisor-result-desc">{result.desc}</p>

                  <div className="advisor-result-actions">
                    <Link
                      to={`/doctors?specialty=${encodeURIComponent(result.specialty)}`}
                      className="advisor-cta-btn"
                    >
                      <span>Find {result.specialty} Doctors</span>
                      <ArrowRight size={15} />
                    </Link>
                    <button
                      type="button"
                      className="advisor-restart-btn"
                      onClick={handleReset}
                    >
                      <RotateCcw size={14} />
                      <span>Retake Advisor</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Advisor;
