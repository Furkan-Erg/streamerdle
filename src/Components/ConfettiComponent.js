import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";

function ConfettiComponent() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Confetti
      width={size.width}
      height={size.height}
      recycle={false}
      numberOfPieces={450}
      colors={["#9146ff", "#b38cff", "#16a34a", "#ea8a0c", "#ffffff"]}
      style={{ position: "fixed", inset: 0, zIndex: 50, pointerEvents: "none" }}
    />
  );
}
export default ConfettiComponent;
