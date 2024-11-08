import React, { useState, useEffect } from "react";

const DynamicSVG = ({ svgUrl, color, width = 24, height = 24, ...props }) => {
  const [svgContent, setSvgContent] = useState("");

  useEffect(() => {
    fetch(svgUrl)
      .then((response) => response.text())
      .then((data) => {
        const coloredSVG = data.replace(
          /(<path[^>]*\sfill=")[^"]*(")/g,
          `$1${color}$2`
        );
        const encodedSvg = btoa(coloredSVG);
        setSvgContent(`data:image/svg+xml;base64,${encodedSvg}`);
      });
  }, [svgUrl, color]);

  return (
    <img src={svgContent} alt="icon" width={width} height={height} {...props} />
  );
};

export default DynamicSVG;
