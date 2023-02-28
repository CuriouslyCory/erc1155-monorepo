import { useState, useEffect, useRef } from "react";

type ScaleTextProps = {
  children: React.ReactNode;
};

function ScaleText({ children }: ScaleTextProps) {
  const [scale, setScale] = useState(16);
  const parentRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const baseTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!parentRef.current || !textRef.current) return;

    const handleParentResize = () => {
      const parent = parentRef.current;
      const text = textRef.current;
      const baseText = baseTextRef.current;
      if (parent && text && baseText) {
        const { height: parentHeight, width: parentWidth } =
          parent.getBoundingClientRect();
        const { height: textHeight, width: textWidth } =
          baseText.getBoundingClientRect();

        const heightRatio = parentHeight / textHeight;
        const widthRatio = parentWidth / textWidth;

        setScale(Math.min(heightRatio, widthRatio));
      }
    };
    handleParentResize();
    setTimeout(() => handleParentResize(), 2000);

    const observer = new ResizeObserver(() => handleParentResize());
    observer.observe(parentRef.current);

    return () => {
      observer.disconnect();
    };
  }, [parentRef, textRef]);

  return (
    <div
      className="flex h-full w-full items-center justify-center overflow-hidden"
      ref={parentRef}
    >
      <span
        className="whitespace-nowrap"
        style={{ transform: `scale(${scale})` }}
        ref={textRef}
      >
        {children}
      </span>
      <span className="absolute whitespace-nowrap opacity-0" ref={baseTextRef}>
        {children}
      </span>
    </div>
  );
}

export default ScaleText;
