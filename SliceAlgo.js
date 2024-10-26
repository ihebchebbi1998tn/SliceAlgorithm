import React, { useEffect, useRef } from 'react';

const SlicedImage = ({ imageUrl, sliceWidth, sliceHeight }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      const slicesX = Math.ceil(img.width / sliceWidth);
      const slicesY = Math.ceil(img.height / sliceHeight);

      canvas.width = img.width;
      canvas.height = img.height;

      for (let x = 0; x < slicesX; x++) {
        for (let y = 0; y < slicesY; y++) {
          context.drawImage(
            img,
            x * sliceWidth,
            y * sliceHeight,
            sliceWidth,
            sliceHeight,
            x * sliceWidth,
            y * sliceHeight,
            sliceWidth,
            sliceHeight
          );
        }
      }
    };

    return () => {
      context.clearRect(0, 0, canvas.width, canvas.height); 
    };
  }, [imageUrl, sliceWidth, sliceHeight]);

  return <canvas ref={canvasRef} />;
};

const App = () => {
  const imagesData = {
    images: [
      "https://via.placeholder.com/600x400?text=Image+1",
      "https://via.placeholder.com/600x400?text=Image+2",
      "https://via.placeholder.com/600x400?text=Image+3",
      "https://via.placeholder.com/600x400?text=Image+4",
      "https://via.placeholder.com/600x400?text=Image+5"
    ]
  };

  return (
    <div>
      <h1>Sliced Images Example</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {imagesData.images.map((imageUrl, index) => (
          <div key={index} style={{ margin: '10px' }}>
            <SlicedImage imageUrl={imageUrl} sliceWidth={100} sliceHeight={100} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
