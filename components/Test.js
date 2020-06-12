import { useRef } from 'react';
import { Button } from '@blueprintjs/core';
import dynamic from 'next/dynamic'
import Sidebar from './Sidebar';
import LoadingOverlay from './LoadingOverlay';
import { pushTestCase } from '../utils/store';

const Scatterplot = dynamic(
  () => import('./Scatterplot'),
  { ssr: false }
)

const Winglets = dynamic(
  () => import('./Winglets'),
  { ssr: false }
)

// TODO add winglets, add conditional to determine if rendering winglets or scatterplot

const Test = ({ goToNext, testCase }) => {
  const loadingWrapperRef = useRef(null);
  const startTime = useRef(null);


  const startLoading = () => {
    if (!loadingWrapperRef.current) return;

    loadingWrapperRef.current.style.opacity = 1;
  };
  const stopLoading = () => {
    if (!loadingWrapperRef.current) return;

    loadingWrapperRef.current.style.opacity = 0;
  };
  const startTimer = () => {
    requestAnimationFrame(() => {
      startTime.current = new Date();
    });
  };
  const stopTimer = () => {
    const endTime = new Date();
    return (endTime - startTime.current) / 1000;
  };

  const handleButtonClick = (answer) => {
    startLoading();
    const time = stopTimer();

    pushTestCase({
      answer: answer,
      time,
      testCase
    });

    requestAnimationFrame(() => goToNext());
  };

  return (
    <div className="container">
      <div className="content">
        <div className="loading-wrapper" ref={loadingWrapperRef}>
          <LoadingOverlay />
        </div>

        <Winglets
          data={testCase.data()}
          viz={testCase.viz}
          stopLoading={stopLoading}
          startTimer={startTimer}
        />

        <Scatterplot
          data={testCase.data()}
          viz={testCase.viz}
          stopLoading={stopLoading}
          startTimer={startTimer}
        />

      </div>

      <Sidebar>
        <h3>How many clusters are there?</h3>
        <Button className="test-button" onClick={() => handleButtonClick(1)}>1 cluster</Button>
        <Button className="test-button" onClick={() => handleButtonClick(2)}>2 clusters</Button>
        <Button className="test-button" onClick={() => handleButtonClick(3)}>3 clusters</Button>
        <Button className="test-button" onClick={() => handleButtonClick(4)}>4 clusters</Button>
        <Button className="test-button" onClick={() => handleButtonClick(5)}>5 clusters</Button>
        <Button className="test-button" onClick={() => handleButtonClick(6)}>6 clusters</Button>
        <Button className="test-button" onClick={() => handleButtonClick(7)}>7 clusters</Button>
        <Button className="test-button" onClick={() => handleButtonClick(8)}>8 clusters</Button>
        <Button className="test-button" onClick={() => handleButtonClick(-1)}>I cannot decide</Button>
      </Sidebar>

      <style jsx>{`
        .container {
          width: 100%;
          height: 100%;
          display: flex;
          background: #000;
        }

        .content {
          flex-grow: 1;
          display: flexbox;
          align-items: center;
          justify-content: center;
          height: 100%;
          position: relative;
        }

        .option-wrapper {
          text-align: center;
          display: flexbox;
          align-items: center;
          justify-content: center;
        }

        .loading-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 10;

          opacity: 1;
          transition: opacity 300ms cubic-bezier(0.755, 0.05, 0.855, 0.06);
        }
      `}</style>

      <style jsx global>{`
        .test-button {
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
};

export default Test;
