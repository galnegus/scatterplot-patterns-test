import Introduction from '../components/Introduction';
import Test from '../components/Test';
import Outro from '../components/Outro';

export default function createSlides(testCases, goToNext) {
  const slides = [];

  slides.push((<Introduction goToNext={goToNext} />));

  testCases.forEach((testCase) => {
    slides.push((<Test goToNext={goToNext} testCase={testCase} />))
  });

  slides.push((<Outro />))

  return slides;
}
