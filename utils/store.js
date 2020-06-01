const store = {
  testCases: [],
  user: {}
};

export default store;

export function setUser(user) {
  store.user = { ...user };
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

