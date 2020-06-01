import _shuffle from 'lodash/shuffle';
import TestCase, { N_CLUSTERS, N_POINTS, VIZ } from './TestCase';

// Each test case should be a combination of:
// 1. A dataset, of which there are three variables:
//      (a): 3, 5, or 7 clusters
//      (b): 100, 1000, 10000 points
//    for a total number of 9 different data sets
// 2. A pattern:
//      (a): Standard scatterplot w/ color
//      (a): Standard scatterplot w/o color
//      (b): Winglets w/o color
//      (c): Scatterplot patterns w/o color
//      (d): Sequential scatteplot patterns w/o color

export default function generateTestCases() {
  const res = [];

  const N_CLUSTERS_KEYS = Object.keys(N_CLUSTERS);  
  const N_POINTS_KEYS = Object.keys(N_POINTS);  
  const VIZ_KEYS = Object.keys(VIZ);  

  
  for (let i = 0; i < N_CLUSTERS_KEYS.length; ++i) {
    for (let j = 0; j < N_POINTS_KEYS.length; ++j) {
      for (let k = 0; k < VIZ_KEYS.length; ++k) {
        res.push(new TestCase({
          nClusters: N_CLUSTERS[N_CLUSTERS_KEYS[i]],
          nPoints: N_POINTS[N_POINTS_KEYS[j]],
          viz: VIZ[VIZ_KEYS[k]]
        }));
      }
    }
  }
  
 
  // TEMP
  /*
  for (let k = 0; k < VIZ_KEYS.length; ++k) {
    res.push(new TestCase({
      nClusters: N_CLUSTERS["3"],
      nPoints: N_POINTS["1000"],
      viz: VIZ[VIZ_KEYS[k]]
    }));
  }
  */

  return _shuffle(res);
}
