import { useState, useCallback, useEffect } from 'react';
import createScatterplot from '../utils/winglets/regl-scatterplot-winglets.esm.min.js';
import { VIZ } from '../utils/TestCase';

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

function initScatterplot({ canvas, setScatterplot }) {
  let { width, height } = canvas.getBoundingClientRect();

  const lassoMinDelay = 10;
  const lassoMinDist = 2;
  const pointSize = 5;
  const showRecticle = false;
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
}

const Winglets = ({ data, stopLoading, viz, startTimer }) => {
  const [scatterplot, setScatterplot] = useState(null);
  const canvasRef = useCallback((canvas) => {
    if (canvas !== null)
      initScatterplot({ canvas, setScatterplot, data, stopLoading, startTimer });
  }, [setScatterplot]);

  useEffect(() => {
    if (scatterplot !== null && viz === VIZ.WINGLETS) {
      scatterplot.reset();
      scatterplot.draw(data.data);
      stopLoading();
      startTimer();
    }

    return () => {
      if (scatterplot) {
        scatterplot.draw([[-2, -2, 0, 0], [-2, -3, 0, 0], [-3, -2, 0, 0]]);
      }
    }
  }, [scatterplot, data, viz]);

  return (
    <div className="canvas-wrapper" style={{ visibility: viz === VIZ.WINGLETS ? 'visible' : 'hidden' }}>
      <canvas ref={canvasRef} className="canvas" />

      <style jsx>{`
        .canvas-wrapper {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
        }

        .canvas {
          position: absolute;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  );
};

export default Winglets;
