import { useState, useRef } from 'react';
import generateTestCases from '../utils/generateTestCases';
import createSlides from '../utils/createSlides';

const Slideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToNext = () => {
    setCurrentSlide((prevCurrentSlide) => prevCurrentSlide + 1);
  };

  const slidesRef = useRef(createSlides(generateTestCases(), goToNext));

  return (
    <>
      { slidesRef.current[currentSlide] }
    </>
  )
};

export default Slideshow;
