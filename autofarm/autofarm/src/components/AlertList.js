import React from 'react';

function AlertList({ alerts }) {
  return (
    <div className="alert-list">
      <h3>Cảnh Báo</h3>
      {alerts.length > 0 ? (
        <ul>
          {alerts.map((alert) => (
            <li key={alert.id}>
              {alert.message} - {alert.time}
            </li>
          ))}
        </ul>
      ) : (
        <p>Không có cảnh báo.</p>
      )}
    </div>
  );
}

export default AlertList;