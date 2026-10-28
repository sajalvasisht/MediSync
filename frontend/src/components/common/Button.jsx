import React from 'react';
import './Button.css';

/**
 * Button — MediSync shared button component.
 *
 * Props
 * ─────
 * variant  : 'primary' | 'secondary' | 'outline' | 'ghost'  (default 'primary')
 * size     : 'sm' | 'md' | 'lg'                             (default 'md')
 * icon     : React element rendered before children
 * onClick  : click handler
 * disabled : boolean
 * as       : override root element tag (default 'button', or 'a' when href present)
 * href     : turns component into an anchor
 * className: extra classes
 */
const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  onClick,
  disabled = false,
  as: Tag,
  href,
  className = '',
  type = 'button',
  ...rest
}) => {
  const Element = Tag || (href ? 'a' : 'button');

  const classes = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    disabled ? 'btn--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const linkProps = href ? { href } : {};
  const buttonProps = Element === 'button' ? { type, disabled } : { 'aria-disabled': disabled };

  return (
    <Element
      className={classes}
      onClick={!disabled ? onClick : undefined}
      {...linkProps}
      {...buttonProps}
      {...rest}
    >
      {icon && <span className="btn__icon">{icon}</span>}
      {children}
    </Element>
  );
};

export default Button;
