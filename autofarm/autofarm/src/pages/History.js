import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale);

function History() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Xu Hướng Nhiệt Độ',
        color: '#4CAF50',
      },
      legend: {
        labels: {
          color: '#333333',
        },
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Nhiệt Độ (°C)',
          color: '#4CAF50',
        },
        ticks: {
          color: '#333333',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Thời Gian',
          color: '#4CAF50',
        },
        ticks: {
          color: '#333333',
        },
      },
    },
  };

  useEffect(() => {
    const fakeHistoryData = [
      { timestamp: '2025-03-07 08:00', temperature: 28, humidity: 48, soilMoisture: 50, lightIntensity: 450 },
      { timestamp: '2025-03-07 09:00', temperature: 27, humidity: 66, soilMoisture: 40, lightIntensity: 450 },
      { timestamp: '2025-03-07 10:00', temperature: 28, humidity: 62, soilMoisture: 42, lightIntensity: 520 },
      { timestamp: '2025-03-07 09:00', temperature: 26, humidity: 60, soilMoisture: 55, lightIntensity: 450 },
      { timestamp: '2025-03-07 10:00', temperature: 25, humidity: 62, soilMoisture: 42, lightIntensity: 520 },
      { timestamp: '2025-03-07 09:00', temperature: 24, humidity: 66, soilMoisture: 40, lightIntensity: 450 },
      { timestamp: '2025-03-07 10:00', temperature: 28, humidity: 77, soilMoisture: 50, lightIntensity: 660 },
    ];

    const labels = fakeHistoryData.map(d => d.timestamp);
    const tempData = fakeHistoryData.map(d => d.temperature);
    setChartData({
      labels,
      datasets: [
        {
          label: 'Nhiệt Độ (°C)',
          data: tempData,
          borderColor: 'rgba(76, 175, 80, 1)',
          backgroundColor: 'rgba(76, 175, 80, 0.2)',
          fill: true,
          tension: 0.4, // Thêm đường cong mượt
        },
      ],
    });
  }, []);

  return (
    <div className="history">
      <h1>Dữ Liệu Lịch Sử</h1>
      {chartData.labels.length > 0 && chartData.datasets.length > 0 ? (
        <Line data={chartData} options={options} />
      ) : (
        <p>Đang tải dữ liệu...</p>
      )}
      <button onClick={() => alert('Tải xuống CSV')}>Tải Xuống Dữ Liệu</button>
    </div>
  );
}

export default History;