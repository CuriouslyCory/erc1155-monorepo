import { useEffect } from "react";

type UseResizeParams = {
  ref: React.RefObject<HTMLElement>;
  callback: (current: HTMLElement | null) => void;
};

export const useResize = ({ ref, callback }: UseResizeParams) => {
  useEffect(() => {
    if (!ref.current) return;

    callback?.(ref?.current);

    const observer = new ResizeObserver(() => callback?.(ref?.current));
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, callback]);
};
