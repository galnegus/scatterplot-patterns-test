const store = {
  testCases: [],
  viewport: { width: 0, height: 0 },
  dummyTest: { nClusters: 0, nPoints: 0, viz: "", time: 0, answer: 0 },
  totalTime: -1,
  userAgent: "",
};

export default store;

export function setViewport(width, height) {
  store.viewport.width = width;
  store.viewport.height = height;
}

export function setDummyTest({ testCase, time, answer }) {
  store.dummyTest = {
    nClusters: testCase.nClusters,
    nPoints: testCase.nPoints,
    viz: testCase.viz,
    time,
    answer
  };
}

export function setUserAgent(ua) {
  store.userAgent = ua;
}

export function computeTotalTime() {
  store.totalTime = store.testCases.reduce((totalTime, testCase) => totalTime + testCase.time, 0);
}

export function pushTestCase({ testCase, time, answer }) {
  const newTestCase = {
    order: store.testCases.length,
    nClusters: testCase.nClusters,
    nPoints: testCase.nPoints,
    viz: testCase.viz,
    time,
    answer
  }

  store.testCases.push(newTestCase);
}

export function getCreateQuery() {
  const testCases = store.testCases.map((testCase) => {
    return `{
      order: ${testCase.order}
      nClusters: ${testCase.nClusters}
      nPoints: ${testCase.nPoints}
      viz: "${testCase.viz}"
      time: ${testCase.time}
      answer: ${testCase.answer}
    }`;
  }).join(', ');

  const query = `
    mutation {
      createSurvey(data: {
        testCases: {
          create: [
            ${testCases}
          ]
        }
        viewport: {
          create: {
            width: ${store.viewport.width}
            height: ${store.viewport.height}
          }
        }
        dummyTest: {
          create: {
            nClusters: ${store.dummyTest.nClusters}
            nPoints: ${store.dummyTest.nPoints}
            viz: "${store.dummyTest.viz}"
            time: ${store.dummyTest.time}
            answer: ${store.dummyTest.answer}
          }
        }
        totalTime: ${store.totalTime}
        userAgent: "${store.userAgent}"
      }) {
        _id
        testCases {
          data {
            order
            nClusters
            nPoints
            viz
            time
            answer
          }
        }
        viewport {
          width
          height
        }
        dummyTest {
          nClusters
          nPoints
          viz
          time
          answer
        }
        totalTime
        userAgent
      }
    }
  `;

  return query;
}

