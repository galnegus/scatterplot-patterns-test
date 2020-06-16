import React from 'react';
import { Spinner } from '@blueprintjs/core';

export default function LoadingOverlay() {
  return (
    <div className="overlay">
      <div className="container">
        <Spinner
          size={200}
        />
        <span className="text bp3-text-muted">
          Loading
        </span>
        <div className="cool-text">
          <div className="ellipsis">Building Scatterplot</div>
          <div className="time-text bp3-text-muted">(this can take up to 10 seconds)</div>
        </div>
      </div>

      <style jsx>
      {`
        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          width: 100%;
          height: 100%;
          background #000;
        }

        .container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate3d(-50%, -50%, 0);
          width: 200px;
          height: 200px;
          padding: 0px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, .1);
          box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
        }

        .text {
          font-weight: 600;
          text-transform: uppercase;
          font-size: 2em;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate3d(-50%, -50%, 0);
          text-shadow: 0px 0px 8px rgba(0,0,0,0.8);
        }

        .cool-text {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translate3d(-50%, 0, 0);
          text-shadow: 0px 0px 8px rgba(0,0,0,0.8);
          width: 200px;
          margin-top: 20px;
          line-height: 1.6;
        }

        .ellipsis {
          text-align: center;
          margin-left: -5px;
        }

        .ellipsis::after {
          position: absolute;

          overflow: hidden;
          display: inline-block;
          vertical-align: bottom;  
          animation: ellipsis steps(4,end) 2000ms infinite;
          content: "${'\\2026'}";
          width: 0px;
        }

        @keyframes ellipsis {
          to {
            width: 1em;    
          }
        }

        .time-text {
          text-align: center;
        }
      `}
      </style>
    </div>
  );
}
