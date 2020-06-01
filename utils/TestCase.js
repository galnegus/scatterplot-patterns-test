import _has from 'lodash/has';
import _some from 'lodash/some';
import dataMap from './dataMap';

export const N_CLUSTERS = {
  3: "3",
  5: "5",
  7: "7",
};

export const N_POINTS = {
  100: "100",
  1000: "1000",
  10000: "10000"
};

export const VIZ = {
  PATTERNS: "patterns",
  SEQUENTIAL: "sequential",
  WINGLETS: "winglets",
  COLOR: "color",
  GREYSCALE: "greyscale"
};

// Each test case should be an instance of this class
class TestCase {
  constructor({ nClusters, nPoints, viz }) {
    // validate input
    if (!_has(N_CLUSTERS, nClusters)) throw new Error("nClusters argument invalid!")
    if (!_has(N_POINTS, nPoints)) throw new Error("nPoints argument invalid!")
    if (!_some(VIZ, (value) => viz === value)) throw new Error(`viz argument invalid: ${viz}`)

    this.nClusters = nClusters;
    this.nPoints = nPoints;
    this.viz = viz;
  }

  filename() {
    return `c${this.nClusters}_n${this.nPoints}_${this.viz}`;
  }

  data() {
    return dataMap[this.filename()];
  }

  temp() {
    return `Showing a ${this.viz} visualization with ${this.nClusters} clusters and ${this.nPoints}`;
  }
}

export default TestCase;
