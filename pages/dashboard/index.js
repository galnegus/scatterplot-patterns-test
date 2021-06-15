import { useRef } from 'react';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import { Button } from '@blueprintjs/core';
import { saveAs } from 'file-saver';
import UAParser from 'ua-parser-js';
import Layout from '../../dashboard/Layout';
import Store from '../../dashboard/Store';

const Dashboard = () => {
  const storeRef = useRef(new Store());
  const parserRef = useRef(new UAParser());
  const router = useRouter();

  const hello = (ref) => {
    router.push('/dashboard/surveys/[ref]', `/dashboard/surveys/${ref}`);
  };

  const surveys = storeRef.current.rows().map((row, i) => {
    parserRef.current.setUA(row.userAgent);
    return (
      <tr key={i + 1} onClick={() => hello(row.ref)}>
        <td>{i + 1}</td>
        <td>{format(new Date(row.ts / 1000), 'MMM d, H:mm')}</td>
        <td>{row.totalTime}</td>
        <td>{"todo"}</td>
        <td>{row.dummyTest.answer}</td>
        <td>{row.dummyTest.time}</td>
        <td>{parserRef.current.getBrowser().name}, {parserRef.current.getOS().name}</td>
        <td>{row.viewport.width}</td>
        <td>{row.viewport.height}</td>
        <td>{row.fingerprint}</td>
      </tr>
    );
  });

  const saveSurveys = () => {
    const filename = 'surveys.json';
    const jsonFile = new Blob([storeRef.current.getSurveysJSON()], {
      type: 'application/json',
    });
    saveAs(jsonFile, filename);
  };

  const saveTestCases = () => {
    const filename = 'testCases.json';
    const jsonFile = new Blob([storeRef.current.getTestCasesJSON()], {
      type: 'application/json',
    });
    saveAs(jsonFile, filename);
  };
  

  return (
    <Layout>
      <div>
        <Button onClick={saveSurveys}>Surveys JSON Download</Button>
        <Button onClick={saveTestCases}>Test Cases JSON Download</Button>
      </div>

      <table className="bp3-html-table bp3-html-table-condensed bp3-html-table-striped bp3-interactive">
        <thead>
          <tr>
            <th>#</th>
            <th>Timestamp</th>
            <th>Total Time (s)</th>
            <th>Accuracy</th>
            <th>Dummy Answer</th>
            <th>Dummy Time (s)</th>
            <th>Browser</th>
            <th>Viewport Width</th>
            <th>Viewport Height</th>
            <th>Fingerprint</th>
          </tr>
        </thead>
        <tbody>
          {surveys}
        </tbody>
      </table>
    </Layout>
  );
};

export default Dashboard;
