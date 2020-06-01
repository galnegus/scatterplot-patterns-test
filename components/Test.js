import { useState, useRef } from 'react';
import { Button } from '@blueprintjs/core';
import dynamic from 'next/dynamic'
import Sidebar from './Sidebar';
import { VIZ } from '../utils/TestCase';
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
  const [isLoading, setIsLoading] = useState(true);
  const startTime = useRef(null);

  const stopLoading = () => {
    setIsLoading(false);
  }
  const startTimer = () => {
    requestAnimationFrame(() => {
      startTime.current = new Date();
    });
  }
  const stopTimer = () => {
    const endTime = new Date();
    return (endTime - startTime.current) / 1000;
  }

  const handleButtonClick = (answer) => {
    const time = stopTimer();

    pushTestCase({
      answer: String(answer),
      time,
      testCase
    });

    goToNext();
  };

  return (
    <div className="container">
      <div className="content">
        {isLoading &&
          <LoadingOverlay />
        }

        {testCase.viz === VIZ.WINGLETS
          ? <Winglets data={testCase.data()} stopLoading={stopLoading} startTimer={startTimer} />
          : <Scatterplot data={testCase.data()} viz={testCase.viz} stopLoading={stopLoading} startTimer={startTimer} />
        }
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
          text-align: center;
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
