import React from 'react';

function SensorCard({ title, value, unit }) {
  return (
    <div className="sensor-card">
      <h3>{title}</h3>
      <p>{value} {unit}</p>
    </div>
  );
}

export default SensorCard;