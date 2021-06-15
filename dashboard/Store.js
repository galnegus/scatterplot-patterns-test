import DummyTest from './data/DummyTest.json';
import Survey from './data/Survey.json';
import TestCase from './data/TestCase.json';
import Viewport from './data/Viewport.json';
import _has from 'lodash/has';

function buildTemp(data) {
  const temp = {};

  data.forEach((entry) => {
    const key = entry.ref['@ref'].id;
    temp[key] = entry.data;
    temp[key].ref = key;

    if (_has(entry, 'ts')) temp[key].ts = entry.ts;
  });

  return temp;
}

function linkOneToOne(aObj, bObj, aName, bName) {
  const aKeys = Object.keys(aObj);
  const bKeys = Object.keys(bObj);
  if (_has(aObj[aKeys[0]], bName)) {
    aKeys.forEach((key) => {
      const entry = aObj[key];

      if (!_has(entry[bName], '@ref')) return;

      const ref = entry[bName]['@ref'].id;
      entry[bName] = bObj[ref];
      bObj[ref][aName] = entry;
    });
  } else if (_has(bObj[bKeys[0]], aName)) {
    bKeys.forEach((key) => {
      const entry = bObj[key];

      if (!_has(entry[aName], '@ref')) return;

      const ref = entry[aName]['@ref'].id;
      entry[aName] = aObj[ref];
      aObj[ref][bName] = entry;
    });
  }
}

function linkOneToMany(aObj, bObj, aName, bName) {
  const bKeys = Object.keys(bObj);
  bKeys.forEach((key) => {
    const entry = bObj[key];

    if (!_has(entry[aName], '@ref')) return;

    const ref = entry[aName]['@ref'].id;
    entry[aName] = aObj[ref];

    if (!_has(aObj[ref], bName)) aObj[ref][bName] = [];
    aObj[ref][bName].push(entry);
  });
}

class Store {
  #store = {};

  #flatSurveys = [];
  #flatTestCases = [];

  constructor() {
    const tempSurveys = buildTemp(Survey);
    const tempTestCases = buildTemp(TestCase);
    const tempDummyTests = buildTemp(DummyTest);
    const tempViewports = buildTemp(Viewport);

    linkOneToOne(tempSurveys, tempDummyTests, 'survey', 'dummyTest');
    linkOneToOne(tempSurveys, tempViewports, 'survey', 'viewport');
    linkOneToMany(tempSurveys, tempTestCases, 'survey', 'testCases');

    this.#store = tempSurveys;

    this.buildExports();
  }

  rows() {
    return Object.keys(this.#store).map((key) => this.#store[key]);
  }

  testCases(surveyRef) {
    return this.#store[surveyRef].testCases;
  }

  hasRef(surveyRef) {
    return _has(this.#store, surveyRef);
  }

  hello() {
    return "hello";
  }

  buildExports() {
    Object.keys(this.#store).forEach((key, i) => {
      const survey = this.#store[key];
      const id = i + 1;

      // eslint-disable-next-line no-unused-vars
      const { dummyTest, testCases: surveyTestCases, viewport, ref: surveyRef, ...data } = survey;

      const newSurvey = {
        id,
        ...data,
        dummyAnswer: dummyTest.answer,
        dummyTime: dummyTest.time,
        viewportWidth: viewport.width,
        viewportHeight: viewport.height,
      };
      this.#flatSurveys.push(newSurvey);

      surveyTestCases.forEach((testCase) => {
        // eslint-disable-next-line no-unused-vars
        const { survey: testSurvey, ref: testRef, ...testData } = testCase;

        const newTestCase = {
          ...testData,
          survey: id
        };
        this.#flatTestCases.push(newTestCase);
      });
    });
  }

  getSurveysJSON() {
    return JSON.stringify(this.#flatSurveys);
  }

  getTestCasesJSON() {
    return JSON.stringify(this.#flatTestCases);
  }
}

export default Store;
