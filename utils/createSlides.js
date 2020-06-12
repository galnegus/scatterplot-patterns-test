import Introduction from '../components/Introduction';
import DummyTest from '../components/DummyTest';
import Instructions from '../components/Instructions';
import Test from '../components/Test';
import Outro from '../components/Outro';
import OnboardingTestCase, { VIZ } from './OnboardingTestCase';

export default function createSlides(testCases, goToNext) {
  const slides = [];

  slides.push((<Introduction goToNext={goToNext} />));

  const onboardingTestCase = new OnboardingTestCase({ viz: VIZ.WINGLETS });
  slides.push((<DummyTest goToNext={goToNext} testCase={onboardingTestCase} />));

  slides.push((<Instructions goToNext={goToNext} />));

  testCases.forEach((testCase) => {
    slides.push((<Test goToNext={goToNext} testCase={testCase} />))
  });

  slides.push((<Outro />))

  return slides;
}
