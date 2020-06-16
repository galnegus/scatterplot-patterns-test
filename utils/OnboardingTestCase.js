import data from '../data/onboarding/c3_n1000_dummy.json';

export const VIZ = {
  COLOR: "color",
  GREYSCALE: "greyscale",
  PATTERNS: "patterns",
  SEQUENTIAL: "sequential",
  WINGLETS: "winglets",
};

// Each test case should be an instance of this class
class OnboardingTestCase {
  constructor({ viz }) {
    this.nClusters = 3;
    this.nPoints = 1000;
    this.viz = viz;
  }

  filename() {
    return 'c3_n1000_dummy';
  }

  data() {
    return data;
  }

  temp() {
    return `Showing a ${this.viz} visualization with ${this.nClusters} clusters and ${this.nPoints}`;
  }
}

export default OnboardingTestCase;
