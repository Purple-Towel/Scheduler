import { useState } from "react";

export function useVisualMode(modeInit) {
  const [mode, setMode] = useState(modeInit);
  const [history, setHistory] = useState([modeInit]);

  const transition = (nextMode, replaceMode) => {
    if (!replaceMode) {
      setHistory([...history, nextMode]);
    }
    setMode(nextMode);
  }

  const back = () => { 
    if (history.length > 1) {
    history.pop();
    setMode(history[history.length - 1]);
    }
  }

  return { mode, transition, back};
}

