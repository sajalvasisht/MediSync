import React from 'react';
import './Badge.css';

/**
 * Badge — mono eyebrow label with optional animated dot.
 * variant: 'default' | 'sage' | 'primary' | 'outline'
 */
const Badge = ({ children, variant = 'default', dot = false, className = '', ...rest }) => (
  <span className={`badge badge--${variant} ${className}`} {...rest}>
    {dot && <span className="badge__dot" aria-hidden="true" />}
    {children}
  </span>
);

export default Badge;
