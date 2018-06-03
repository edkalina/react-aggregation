import React from 'react';

export default function OptionRenderer({ value, children, onSelect, isSelected }) {
  return (
    <div
      onClick={() => onSelect(value)}
      style={{
        padding: '5px',
        cursor: 'pointer',
        color: isSelected ? 'blue' : undefined,
      }}
    >
      {children}
    </div>
  );
}
