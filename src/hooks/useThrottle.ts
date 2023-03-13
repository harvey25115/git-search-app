import { useState } from "react";

// Github api request limit per minute is 10
// every 6sec Github api can be called within 1 minute.
const DELAY_TIME = 6000;

/**
 * Create throttled function
 */
export default function useThrottle() {
  const [goSignal, setGoSignal] = useState(true);

  return (eventHandler: Function) => {
    // if there is an event ongoing, exit
    if (!goSignal) {
      return;
    }
    // call throttled function
    eventHandler();
    setGoSignal(false);
    // set delay
    let timerId = setTimeout(() => {
      setGoSignal(true);
      clearTimeout(timerId);
    }, DELAY_TIME);
  };
}
