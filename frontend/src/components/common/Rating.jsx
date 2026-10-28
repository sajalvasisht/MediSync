import React from 'react';
import { Star } from 'lucide-react';
import './Rating.css';

/**
 * Rating — star display component.
 * value: 0-5, size: 'sm' | 'md' | 'lg'
 */
const Rating = ({ value = 0, max = 5, size = 'md', showValue = false }) => (
  <div className={`rating rating--${size}`} role="img" aria-label={`Rating: ${value} out of ${max}`}>
    <div className="rating__stars" aria-hidden="true">
      {Array.from({ length: max }, (_, i) => (
        <Star
          key={i}
          className={`rating__star${i < Math.round(value) ? ' rating__star--filled' : ''}`}
        />
      ))}
    </div>
    {showValue && (
      <span className="rating__value">{value.toFixed(1)}</span>
    )}
  </div>
);

export default Rating;
