import { animated, useSpring } from "@react-spring/web";
import clsx from "clsx";
import { useEffect, useState } from "react";
import useOrientation from "../hooks/use-orientation";
import { useScreenDimensions } from "../hooks/use-screen-dimentions";
type UseModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  close: () => void;
  onOpen?: () => void;
  onClose?: () => void;
};
export const Modal = ({
  children,
  isOpen,
  close,
}: UseModalProps): JSX.Element | null => {
  const { orientation } = useOrientation();
  const { width, height } = useScreenDimensions();
  const [modalMaxWidth, setModalMaxWidth] = useState<string>("max-w-lg");

  const [contentSpring, contentApi] = useSpring(
    () => ({
      from: { scale: 0 },
      to: { scale: 0 },
    }),
    [],
  );

  useEffect(() => {
    if (isOpen) {
      contentApi.start({
        from: {
          scale: 0,
        },
        to: {
          scale: 1,
        },
      });
    } else {
      contentApi.start({
        to: {
          scale: 0,
        },
      });
    }
  }, [isOpen, contentApi]);

  useEffect(() => {
    if (orientation === "portrait") {
      // small device, portrait
      if (width < 768) {
        setModalMaxWidth("max-w-screen");
      } else {
        setModalMaxWidth("max-w-lg");
      }
    }
    if (orientation === "landscape") {
      // small device, landscape mode
      if (height < 768) {
        setModalMaxWidth("max-w-screen");
      } else {
        setModalMaxWidth("max-w-xl");
      }
    }
  }, [orientation, width, height]);

  return (
    <animated.div
      className={clsx(
        "modal fixed top-0 left-0 z-[1000] flex h-screen w-screen items-center justify-center bg-slate-800 bg-opacity-50",
        { hidden: !isOpen },
      )}
      onClick={close}
    >
      <animated.div
        className={clsx(
          "max-h-95-screen z-[1000] flex flex-col items-start rounded-xl p-5 md:visible",
          modalMaxWidth,
        )}
        style={{ ...contentSpring }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="modal-body overflow-y-auto px-5 pb-5 md:px-5 md:pb-10">
          {children}
        </div>
      </animated.div>
    </animated.div>
  );
};
