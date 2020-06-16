import { useRef } from 'react';
import { Button, ProgressBar, Intent, Divider } from '@blueprintjs/core';
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

const Test = ({ goToNext, testCase, order }) => {
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
    <>
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
          

          <div className="vertical-center">
            <div className="sidebar-progress-wrapper">
              <div className="sidebar-progress">
                <h5 className="bp3-heading">
                  Survey Progress:{' '}
                  <span className="progress-weight">
                    <span className="bp3-text-muted">{order}</span> of <span className="bp3-text-muted">45</span>
                  </span>
                </h5>
                <ProgressBar
                  stripes={true}
                  animate={false}
                  value={ order / 45}
                  intent={Intent.PRIMARY}
                />

              </div>
              <div className="progress-divider-wrapper"><Divider /></div>
            </div>

            <h5 className="bp3-heading button-heading">How many clusters are there?</h5>
            <Button className="test-button" onClick={() => handleButtonClick(1)}>1 cluster</Button>
            <Button className="test-button" onClick={() => handleButtonClick(2)}>2 clusters</Button>
            <Button className="test-button" onClick={() => handleButtonClick(3)}>3 clusters</Button>
            <Button className="test-button" onClick={() => handleButtonClick(4)}>4 clusters</Button>
            <Button className="test-button" onClick={() => handleButtonClick(5)}>5 clusters</Button>
            <Button className="test-button" onClick={() => handleButtonClick(6)}>6 clusters</Button>
            <Button className="test-button" onClick={() => handleButtonClick(7)}>7 clusters</Button>
            <Button className="test-button" onClick={() => handleButtonClick(8)}>8 clusters</Button>
            <Button className="test-button" onClick={() => handleButtonClick(-1)}>I cannot decide</Button>
          </div>
        </Sidebar>

        
      </div>
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

        .vertical-center {
          display: flex;
          align-items: center;
          text-align: center;
          justify-content: center;
          flex-direction: column;
          height: 100%;
        }

        .button-heading {
          margin-bottom: 15px;
        }

        .sidebar-progress-wrapper {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          width: 100%;
          margin-bottom: 20px;
        }

        .sidebar-progress {
          text-align: center;
          padding: 40px 40px;
        }

        @media (max-height: 685px) {
          .sidebar-progress {
            padding: 20px;
            padding-bottom: 40px;
          }

          .sidebar-progress-wrapper {
            position: relative;
          }

          .vertical-center {
            justify-content: flex-start;
          }
        }

        .sidebar-progress

        .progress-weight {
          font-weight: 400;
        }

        .progress-divider-wrapper {
          padding: 0 20px;
        }
      `}</style>

      <style jsx global>{`
        .test-button {
          margin-bottom: 10px;
        }
      `}</style>
    </>
  );
};

export default Test;
