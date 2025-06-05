import React from 'react';

function PumpControl({ name, status, onToggle }) {
  return (
    <div className="pump-card">
      <h3>{name}</h3>
      <p>Trạng thái: {status}</p>
      <button onClick={onToggle}>
        {status === 'Tắt' ? 'Bật' : 'Tắt'}
      </button>
    </div>
  );
}

export default PumpControl;