"use client"
import * as SliderPrimitive from '@radix-ui/react-slider';
import * as React from "react"

export const Slider = React.forwardRef((props, forwardedRef) => {
  const value = props.value || props.defaultValue;

  return (
    <SliderPrimitive.Slider {...props} ref={forwardedRef}>
      <SliderPrimitive.Track>
        <SliderPrimitive.Range />
      </SliderPrimitive.Track>
      {value.map((_, i) => (
        <SliderPrimitive.Thumb key={i} />
      ))}
    </SliderPrimitive.Slider>
  );
});