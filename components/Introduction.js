import { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player'
import { Button, Intent } from '@blueprintjs/core';

const introduction = ({ goToNext }) => {
  const [hasWatched, setHasWatched] = useState(false);
  const [wiggling, setWiggling] = useState(false);
  const wiggleTimeoutId = useRef(null);

  useEffect(() => {
    return () => {
      if (wiggleTimeoutId.current !== null)
        window.clearTimeout(wiggleTimeoutId.current);
    }
  }, []);

  const wiggle = () => {
    if (wiggleTimeoutId.current !== null) window.clearTimeout(wiggleTimeoutId.current);
    setWiggling(true);
    wiggleTimeoutId.current = window.setTimeout(() => setWiggling(false), 500);
  };

  const watched = () => {
    wiggle();
    setHasWatched(true);
  }

  return (
    <div className="container">
      <div className="inner">
        <h1 className="bp3-heading">Scatterplot Survey</h1>
        <div className="video-wrapper">
          <ReactPlayer
            url="/onboarding.mp4"
            muted={true}
            light={true}
            controls={true}
            playing={true}
            width="100%"
            height="100%"
            className="react-player"
            onEnded={watched}
          />
        </div>
      </div>
      <div className="button-wrapper bp3-running-text">
        {!hasWatched &&
          <p className="button-text">Please watch the video instructions above before continuing.</p>
        }

        <Button
          large={true}
          intent={Intent.PRIMARY}
          disabled={!hasWatched}
          className={wiggling ? 'button-wiggle' : ''}
          onClick={() => goToNext()}
        >
          Continue to example test
        </Button>
      </div>

      <style jsx>{`
        .container {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          height: 100%;
        }

        .inner {
          flex-grow: 0;
          text-align: center;
        }

        .inner h1 {
          margin: 30px;
        }

        .video-wrapper {
          position: relative;
          width: 60vw;
          padding-top: 56.25% /* Player ratio: 100 / (1280 / 720) */
        }

        .button-wrapper {
          flex-grow: 1;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          flex-direction: column;
          padding: 30px;
        }
      `}</style>

      <style jsx global>{`
        .react-player {
          position: absolute;
          top: 0;
          left: 0;
        }

        @keyframes button-wiggle-rotate {
          0% { transform: rotate(0); }
          25% { transform: rotate(-3deg); }
          75% { transform: rotate(3deg); }
          100% { transform: rotate(0); }
        }

        .button-wiggle {
          animation: button-wiggle-rotate 100ms cubic-bezier(0.4, 1, 0.75, 0.9) infinite;
        }
      `}</style>
    </div>
  );
};

export default introduction;
