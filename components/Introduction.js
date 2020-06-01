import { Button, Intent } from '@blueprintjs/core';

const introduction = ({ goToNext }) => {


  return (
    <div className="container">
      <div className="inner">
        <h1>Scatterplot patterns survey</h1>
        <Button large={true} intent={Intent.PRIMARY} onClick={() => goToNext()}>Start test</Button>
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
      `}</style>
    </div>
  );
};

export default introduction;
