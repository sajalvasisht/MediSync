import React from 'react';
import './Tabs.css';

/**
 * Tabs — Pill-style tab bar matching screenshot reference.
 * items: [{ id, label }]
 * activeId: string
 * onChange: (id) => void
 */
const Tabs = ({ items = [], activeId, onChange, className = '' }) => (
  <div className={`tabs-bar ${className}`} role="tablist">
    {items.map((item) => {
      const isActive = item.id === activeId;
      return (
        <button
          key={item.id}
          role="tab"
          aria-selected={isActive}
          className={`tabs-bar__item${isActive ? ' tabs-bar__item--active' : ''}`}
          onClick={() => onChange(item.id)}
        >
          {item.label}
        </button>
      );
    })}
  </div>
);

export default Tabs;
