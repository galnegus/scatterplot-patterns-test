import OnboardingTestCase, { VIZ } from './OnboardingTestCase';

export default function generateOnboardingCases() {
  const res = [];

  res.push(new OnboardingTestCase({
    viz: VIZ.WINGLETS
  }));

  return res;
}
