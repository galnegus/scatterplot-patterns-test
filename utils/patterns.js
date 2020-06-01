import { PATTERN_TYPES, defaultOptions } from './scatterplot/patterns/PatternManager';

const baseRadar = {
  "gamma1": 25,
  "gamma2": 1.3300000000000003,
  "maxValue": 1,
  "minValue": 0.30999999999999994,
  "phaseShift": 0,
  "cyclesPerSecond": 0.17000000000000023,
  "nSpokes": 2,
  "direction": -1,
  "invert": 1,
  "curve": 0,
  "hueVariation": 0,
  "hueVariationPeriod": 2,
  "a": 1,
  "c1": 0.09000000000000001,
  "c2": 0.03
}

const baseCyclesPerSecond = 0.25;
const baseCPSStep = 0.06;

const patterns = new Array(10).fill().map((_, i) => {
  return {
    ...defaultOptions[PATTERN_TYPES.RADAR],
    type: PATTERN_TYPES.RADAR,
    category: i,
    ...baseRadar,
    cyclesPerSecond: baseCyclesPerSecond + baseCPSStep * i,
  };  
});

export default patterns;
