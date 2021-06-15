import { useEffect, useState } from 'react';
import { Button, Intent } from '@blueprintjs/core';
import { computeTotalTime, getCreateQuery } from '../utils/store';

const Outro = () => {
  const [isDone, setIsDone] = useState(false);
  const [pushedButton, setPushedButton] = useState(false);

  useEffect(() => {
    computeTotalTime();

    const query = getCreateQuery();

    async function postData() {
      const res = await fetch('/api', {
        method: 'post',
        headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: `query=${query}`
      });

      if (res.ok) {
        const newData = await res.json()
        console.log(newData);
        setIsDone(true)
      } else {
        console.error("Something went wrong with the create query")
      }
      
    }
    // This function call below will submit the results to FaunaDB,
    // It's currently disabled because the database in no longer active
    // But it could easily be replaced by some other backend if need be.

    // postData()
  }, []);

  const pushButton = () => {
    setPushedButton(true);
  }; 

  return (
    <div className="container">
      <div className="inner">
        <h1>Done!</h1>
      <Button
        large={true}
        intent={Intent.PRIMARY}
        loading={pushedButton && !isDone}
        disabled={pushedButton}
        onClick={pushButton}
      >
        {!pushedButton ?
          'Submit test results' : 
            isDone ?
              'Test results submitted!' :
              'Loading'
        }
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
      `}</style>
    </div>
  );
};

export default Outro;
