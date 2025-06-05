import React, { useEffect, useState } from 'react';
import AlertList from '../components/AlertList';

function AnomalyDetection() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fakeAlerts = [
      { id: 1, message: 'Nhiệt độ cao bất thường', time: '2025-03-07 10:00', type: 'danger' },
      { id: 2, message: 'Độ ẩm đất thấp', time: '2025-03-07 09:30', type: 'warning' },
    ];
    setAlerts(fakeAlerts);



  }, []);

  return (
    <div className="anomaly-detection">
      <h1>Phát Hiện Bất Thường</h1>
      <AlertList alerts={alerts} />
    </div>
  );
}

export default AnomalyDetection;