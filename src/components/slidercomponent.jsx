"use client"
import React from 'react';
import { useSliderContext } from './SharedContext';
import { Slider } from './ui/slider';

const SliderComponent = () => {
  const { xmin, xmax, setXmin, setXmax } = useSliderContext();

  // Slider event handler
  const handleSliderChange = (newXmin, newXmax) => {
    setXmin(newXmin);
    setXmax(newXmax);
  };

  return <><Slider
  min ={0}
  max= {100}
  onValueChange = {((values) => {
    handleSliderChange(values[0], values[1])
  })}
  defaultValue = {[0,100]}
  >
  </Slider>
  </>
};

export default SliderComponent;