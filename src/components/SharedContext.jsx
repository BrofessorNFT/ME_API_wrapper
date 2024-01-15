"use client"
import React, { createContext, useState, useContext } from 'react';

const SliderContext = createContext();

export const useSliderContext = () => useContext(SliderContext);

export const SliderProvider = ({ children }) => {
  const [xmin, setXmin] = useState(0);
  const [xmax, setXmax] = useState(100);

  return <>
    <SliderContext.Provider value={{ xmin, xmax, setXmin, setXmax }}>
      {children}
    </SliderContext.Provider>
     </>
};