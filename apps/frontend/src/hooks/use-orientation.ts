import { useState, useEffect } from "react";

export const useOrientation = () => {
  const [orientation, setOrientation] = useState("");

  const handleOrientationChange = () => {
    const rawOrientationType =
      window.screen?.orientation?.type ?? window.innerWidth > window.innerHeight
        ? "landscape"
        : "portrait";
    const orientationType = rawOrientationType.split("-")[0] ?? "landscape";
    setOrientation(orientationType);
  };

  useEffect(() => {
    handleOrientationChange();

    window.addEventListener("resize", handleOrientationChange);
    window.addEventListener("orientationchange", handleOrientationChange);
    return () => {
      window.removeEventListener("resize", handleOrientationChange);
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, []);

  return { orientation };
};

export default useOrientation;
