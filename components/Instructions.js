import { Button, Intent } from '@blueprintjs/core';
import { setViewport, setUserAgent } from '../utils/store';

const introduction = ({ goToNext }) => {

  const onExit = () => {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    setViewport(vw, vh);

    const ua = window.navigator.userAgent;
    setUserAgent(ua);

    goToNext();
  };

  return (
    <div className="container">
      <div className="inner">
        <h1>Final Instructions</h1>
        <p>
          Good job! You are now ready for the survey.
        </p>
        <p>
          You will specify the number of clusters for <strong>45</strong> different test cases, the speed and accuracy will be recorded, so make sure to answer each test case as <strong>FAST</strong> and as <strong>ACCURATELY</strong> as possible.
        </p>
        <Button
          large={true}
          intent={Intent.PRIMARY}
          onClick={onExit}
        >
          Start Test
        </Button>
      </div>

      <style jsx>{`
        .container {
          text-align: center;
          display: flexbox;
          align-items: center;
          justify-content: center;
          height: 100%;
        }

        .inner {

        }

        .inner p {
          font-size: 16px;
          width: 450px;
          margin: 20px;
          line-height: 1.7;
        }
      `}</style>
    </div>
  );
};

export default introduction;
