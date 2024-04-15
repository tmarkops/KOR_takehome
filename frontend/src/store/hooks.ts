import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
import React, { useState, useEffect, useRef } from "react";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const useInterval = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef<(() => void) | null>(null);

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
