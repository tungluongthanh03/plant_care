import React, { useState } from 'react';

function GardenManagement() {
  const [gardens, setGardens] = useState([
    {
      name: 'Nhà kính A',
      temperature: 28,
      humidity: 62,
      soilMoisture: 7,
      lightIntensity: 500,
      status: 'Hoạt động',
      sensors: 2,
    },
    {
      name: 'Nhà kính B',
      temperature: 29,
      humidity: 60,
      soilMoisture: 6,
      lightIntensity: 480,
      status: 'Hoạt động',
      sensors: 3,
    },
    {
      name: 'Nhà kính C',
      temperature: 30,
      humidity: 58,
      soilMoisture: 8,
      lightIntensity: 520,
      status: 'Hoạt động',
      sensors: 4,
    },
    {
      name: 'Nhà kính D',
      temperature: 27,
      humidity: 65,
      soilMoisture: 5,
      lightIntensity: 490,
      status: 'Tạm ngừng',
      sensors: 5,
    },
  ]);

  return (
    <div className="garden-management">
      <h1>Quản Lý Khu Vườn</h1>
      <div className="garden-grid">
        {gardens.map((garden, index) => (
          <div key={index} className="garden-card">
            <h3>{garden.name}</h3>
            <p>Loại cây: Cây dưa chuột</p>
            <p>Ngày gieo: 01/03/2025</p>
            <p>Ngày thu hoạch: 01/06/2025</p>
            <p>Số cảm biến: {garden.sensors}</p>
            <p>Trạng thái: {garden.status}</p>
            <div className="sensor-data">
              <p>Nhiệt độ: {garden.temperature}°C</p>
              <p>Độ ẩm: {garden.humidity}%</p>
              <p>Độ ẩm đất: {garden.soilMoisture}%</p>
              <p>Ánh sáng: {garden.lightIntensity} lux</p>
            </div>
            <button className={garden.status === 'Hoạt động' ? 'active' : 'inactive'}>
              {garden.status === 'Hoạt động' ? 'Xem chi tiết' : 'Kích hoạt'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GardenManagement;