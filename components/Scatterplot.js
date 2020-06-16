import { useState, useCallback, useEffect } from 'react';
import tinycolor from 'tinycolor2';
import _shuffle from 'lodash/shuffle';
import categoryColors from '../utils/categoryColors';
import createScatterplot from '../utils/scatterplot';
import patterns from '../utils/patterns';
import { VIZ } from '../utils/TestCase';

function toHsvColor(hex) {
  const hsvObj = tinycolor(hex).toHsv();
  return [hsvObj.h / 360, hsvObj.s, hsvObj.v];
}

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
  });

  const resizeHandler = () => {
    ({ width, height } = canvas.getBoundingClientRect());
    scatterplot.set({ width, height });
  };
  window.addEventListener('resize', resizeHandler);

  scatterplot.set({ colorBy: 'category', colors: categoryColors });
  setScatterplot(scatterplot);
}

const Scatterplot = ({ data, viz, stopLoading, startTimer }) => {
  const [scatterplot, setScatterplot] = useState(null);
  const canvasRef = useCallback((canvas) => {
    if (canvas !== null)
      initScatterplot({ canvas, setScatterplot, data, stopLoading, startTimer });
  }, [setScatterplot]);

  useEffect(() => {
    if (scatterplot !== null && viz !== VIZ.WINGLETS) {
      const shuffledColors = _shuffle(categoryColors);
      const patternsWithColors = patterns
        .map((pattern, i) => ({ ...pattern, hsvColor: toHsvColor(shuffledColors[i]) }))
        .slice(0, data.meta.nClusters);
      scatterplot.patternManager.setAll(patternsWithColors);

      scatterplot.reset();
      scatterplot.draw(data.data);

      stopLoading();
      startTimer();

      if (viz === VIZ.PATTERNS) {
        scatterplot.set({
          useColors: false,
          animationMix: [0, 0.5, 0.8],
          useSequence: false,
          showPatterns: true
        });
      } else if (viz === VIZ.SEQUENTIAL) {
        scatterplot.set({
          useColors: false,
          useSequence: true,
          sequencePatternDuration: 1.5,
          sequenceTransitionDuration: 0.2,
          animationMix: [0, 0.5, 0.8],
          showPatterns: true
        });
      } else if (viz === VIZ.COLOR) {
        scatterplot.set({
          useColors: true,
          showPatterns: false,
          useSequence: false
        });
      } else if (viz === VIZ.GREYSCALE) {
        scatterplot.set({
          showPatterns: false,
          useColors: false,
          useSequence: false,
        });
      }
    }


    return () => {
      if (scatterplot) {
        const patternsWithColors = patterns
          .map((pattern, i) => ({ ...pattern, hsvColor: toHsvColor(categoryColors[i]) }))
          .slice(0, 1);
        scatterplot.patternManager.setAll(patternsWithColors);
        scatterplot.draw([[-2, -2, 0, 0]]);
      }
    }
  }, [scatterplot, viz, data]);

  return (
    <div className="canvas-wrapper"  style={{ visibility: viz === VIZ.WINGLETS ? 'hidden' : 'visible' }}>
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

export default Scatterplot;
