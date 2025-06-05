import React from 'react';

function DeviceList({ devices, onDelete }) {
  return (
    <div className="device-list">
      {devices.map(device => (
        <div key={device.id} className="device-card">
          <h3>{device.name}</h3>
          <p>Loại: {device.type}</p>
          <p>Trạng thái: {device.status}</p>
          <button onClick={() => onDelete(device.id)}>Xóa</button>
        </div>
      ))}
    </div>
  );
}

export default DeviceList;