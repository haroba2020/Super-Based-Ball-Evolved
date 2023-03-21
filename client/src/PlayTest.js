import { useState, useRef, useEffect } from 'react';

function MyComponent() {
  const [ballState, setBallState] = useState(20);
  const requestRef = useRef();

  const updateBallState = (timestamp) => {
    setBallState((prevState) => prevState + 0.1);
    requestRef.current = requestAnimationFrame(updateBallState);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(updateBallState);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  // Render your component using the ballState state
  return <div>{ballState}</div>;
}
