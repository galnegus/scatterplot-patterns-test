import { useState, useCallback, useEffect } from 'react';
import tinycolor from 'tinycolor2';
import categoryColors from '../utils/categoryColors';
import createScatterplot from '../utils/scatterplot';
import patterns from '../utils/patterns';
import { VIZ } from '../utils/TestCase';

function toHsvColor(hex) {
  const hsvObj = tinycolor(hex).toHsv();
  return [hsvObj.h / 360, hsvObj.s, hsvObj.v];
}

function initScatterplot({ canvas, setScatterplot, data, viz, stopLoading, startTimer }) {
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
  });

  const resizeHandler = () => {
    ({ width, height } = canvas.getBoundingClientRect());
    scatterplot.set({ width, height });
  };
  window.addEventListener('resize', resizeHandler);

  const patternsWithColors = patterns
    .map((pattern, i) => ({ ...pattern, hsvColor: toHsvColor(categoryColors[i]) }))
    .slice(0, data.meta.nClusters);

  scatterplot.set({ colorBy: 'category', colors: categoryColors });
  scatterplot.patternManager.setAll(patternsWithColors);
  setScatterplot(scatterplot);
  scatterplot.draw(data.data);

  if (viz === VIZ.PATTERNS) {
    scatterplot.set({
      useColors: false,
      animationMix: [0, 0.5, 0.8]
    });
  } else if (viz === VIZ.SEQUENTIAL) {
    scatterplot.set({
      useColors: false,
      useSequence: true,
      sequencePatternDuration: 1.5,
      sequenceTransitionDuration: 0.2,
      animationMix: [0, 0.5, 0.8]
    });
  } else if (viz === VIZ.COLOR) {
    scatterplot.set({
      showPatterns: false,
    });
  } else if (viz === VIZ.GREYSCALE) {
    scatterplot.set({
      showPatterns: false,
      useColors: false,
    });
  }

  stopLoading();
  startTimer();
}

const Scatterplot = ({ data, viz, stopLoading, startTimer }) => {
  const [scatterplot, setScatterplot] = useState(null);
  const canvasRef = useCallback((canvas) => {
    if (canvas !== null)
      initScatterplot({ canvas, setScatterplot, data, viz, stopLoading, startTimer });
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

export default Scatterplot;
