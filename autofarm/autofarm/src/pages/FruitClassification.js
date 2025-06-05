import React, { useState } from 'react';

function FruitClassification() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState('');

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = () => {
    // Fake API: Dữ liệu giả để phát triển frontend
    const fakeResult = 'Chín';
    setResult(fakeResult);
  };

  return (
    <div className="fruit-classification">
      <h1>Phân Loại Trái Cây</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Phân Loại</button>
      {result && <p>Kết Quả: {result}</p>}
    </div>
  );
}

export default FruitClassification;