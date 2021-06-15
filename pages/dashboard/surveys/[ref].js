import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@blueprintjs/core';
import Layout from '../../../dashboard/Layout';
import Store from '../../../dashboard/Store';

const isEmpty = (obj) => Object.entries(obj).length === 0 && obj.constructor === Object;

const Survey = () => {
  const storeRef = useRef(new Store());
  const router = useRouter();
  const [testCase, setTestCase] = useState(null);

  useEffect(() => {
    const hasQuery = !isEmpty(router.query) && router.query.ref !== undefined;
    if (hasQuery && storeRef.current.hasRef(router.query.ref)) {
      setTestCase(storeRef.current.testCases(router.query.ref));
    } else {
      setTestCase(null);
    }
  }, [router, storeRef, setTestCase]);


  let answers = [];

  if (testCase === null) {
    answers = [(
      <tr key={1}>
        <td className="bp3-skeleton"></td>
        <td className="bp3-skeleton"></td>
        <td className="bp3-skeleton"></td>
        <td className="bp3-skeleton"></td>
        <td className="bp3-skeleton"></td>
        <td className="bp3-skeleton"></td>
        <td className="bp3-skeleton"></td>
        <td className="bp3-skeleton"></td>
      </tr>
    )];
  } else {
    answers = testCase.map((answer) => (
      <tr key={answer.order + 1}>
        <td>{answer.order + 1}</td>
        <td>{answer.time}</td>
        <td>{answer.answer}</td>
        <td>{answer.nClusters}</td>
        <td>{answer.nPoints}</td>
        <td>{answer.viz}</td>
        <td>{answer.overlap}</td>
      </tr>
    ));
  }


  return (
    <Layout>
      <table className="bp3-html-table bp3-html-table-condensed bp3-html-table-striped bp3-interactive">
        <thead>
          <tr>
            <th>#</th>
            <th>Time</th>
            <th>Answer</th>
            <th>Clusters</th>
            <th>Points</th>
            <th>Viz</th>
            <th>Overlap</th>
          </tr>
        </thead>
        <tbody>
          {answers}
        </tbody>
      </table>
    </Layout>
  );
};

export default Survey;
