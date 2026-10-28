import React from 'react';
import './Card.css';

/**
 * Card — MediSync shared card surface component.
 *
 * Props
 * ─────
 * children  : card content
 * className : extra classes
 * hover     : bool — adds hover lift effect
 * glass     : bool — adds backdrop blur / glass morphism effect
 * style     : inline styles
 */
const Card = ({
  children,
  className = '',
  hover = false,
  glass = false,
  style,
  onClick,
  ...rest
}) => {
  const classes = [
    'card',
    hover ? 'card--hover' : '',
    glass ? 'card--glass' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} style={style} onClick={onClick} {...rest}>
      {children}
    </div>
  );
};

export default Card;
