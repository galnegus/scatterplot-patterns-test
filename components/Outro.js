import { Button, Intent } from '@blueprintjs/core';
import store from '../utils/store';

const Outro = () => {

  console.dir(store);

  return (
    <div className="container">
      <div className="inner">
        <h1>Done!</h1>
      <Button large={true} intent={Intent.PRIMARY}>Submit test results</Button>
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

export default Outro;
