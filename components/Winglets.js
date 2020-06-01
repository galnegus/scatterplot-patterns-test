import { useState, useCallback, useEffect } from 'react';
import createScatterplot from '../utils/winglets/regl-scatterplot-winglets.esm.min.js';

const wingletsOptions = {
  showWinglets: true,
  showContours: false,
  lineWidth: 1,
  a: 0.01,
  b: 0.06,
  n: 1,
  contourDropoff: 0.1,
}

export const greyscaleColors = [
  '#FFFFFF',
  '#FFFFFF',
  '#FFFFFF',
  '#FFFFFF',
  '#FFFFFF',
  '#FFFFFF',
  '#FFFFFF',
  '#FFFFFF',
  '#FFFFFF',
  '#FFFFFF'
];

function initScatterplot({ canvas, setScatterplot, data, stopLoading, startTimer }) {
  let { width, height } = canvas.getBoundingClientRect();

  const lassoMinDelay = 10;
  const lassoMinDist = 2;
  const pointSize = 5;
  const showRecticle = true;
  const recticleColor = [1, 1, 0.878431373, 0.33];

  const scatterplot = createScatterplot({
    canvas,
    width,
    height,
    lassoMinDelay,
    lassoMinDist,
    pointSize,
    showRecticle,
    recticleColor,
    wingletsOptions
  });

  const resizeHandler = () => {
    ({ width, height } = canvas.getBoundingClientRect());
    scatterplot.set({ width, height });
  };
  window.addEventListener('resize', resizeHandler);

  scatterplot.set({
    colorBy: 'category', 
    colors: greyscaleColors
  });
  setScatterplot(scatterplot);
  scatterplot.draw(data.data);

  stopLoading();
  startTimer();
}

const Winglets = ({ data, stopLoading, startTimer }) => {
  const [scatterplot, setScatterplot] = useState(null);
  const canvasRef = useCallback((canvas) => {
    if (canvas !== null)
      initScatterplot({ canvas, setScatterplot, data, stopLoading, startTimer });
  }, [setScatterplot]);

  useEffect(() => {
    return () => {
      if (scatterplot) scatterplot.destroy()
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="canvas" />

      <style jsx>{`
        .canvas {
          position: absolute;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </>
  );
};

export default Winglets;
