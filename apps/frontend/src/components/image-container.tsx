import { useRef, useState } from "react";
import { useResize } from "../hooks/use-resize";

type ImageContainerProps = {
  children: [JSX.Element, JSX.Element];
  ref?: React.RefObject<HTMLDivElement>;
};
export const ImageContainer = ({ children, ref }: ImageContainerProps) => {
  const imageWrapper = useRef<HTMLDivElement>(null);
  const contentWrapper = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);

  const handleResize = (current: HTMLElement | null) => {
    if (!contentWrapper.current || !current) return;
    const { height: contentHeight, width: contentWidth } =
      current.getBoundingClientRect();
    setContentHeight(contentHeight);
    setContentWidth(contentWidth);
  };
  useResize({ ref: imageWrapper, callback: handleResize });

  return (
    <div className="" ref={ref}>
      <div className="relative h-full w-full" ref={contentWrapper}>
        <div
          className="absolute"
          style={{ height: contentHeight, width: contentWidth }}
        >
          {children[1]}
        </div>
      </div>
      <div ref={imageWrapper}>{children[0]}</div>
    </div>
  );
};
