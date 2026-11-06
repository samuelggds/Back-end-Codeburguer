import { useCallback, useEffect, useRef, useState } from 'react';

export function useToast(duration = 2600) {
  const [toast, setToast] = useState(null);
  const timerRef = useRef(null);
  const sequenceRef = useRef(0);

  const notify = useCallback((message) => {
    clearTimeout(timerRef.current);
    sequenceRef.current += 1;
    setToast({ message, id: sequenceRef.current });
    timerRef.current = setTimeout(() => setToast(null), duration);
  }, [duration]);

  useEffect(() => () => clearTimeout(timerRef.current), []);
  return { toast, notify };
}
