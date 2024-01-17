import { FC } from "react";

import { Svg, Path } from "react-native-svg";

interface WheelProps {
  N: number;
  colors: string[];
}

const Wheel: FC<WheelProps> = ({ N, colors }) => {
  const makeSegment = (index: number) => {
    const startAngle = 0 + (index * 360) / N;
    const endAngle = startAngle + 360 / N;
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    const start = {
      x: 50 + 50 * Math.cos((Math.PI * startAngle) / 180),
      y: 50 + 50 * Math.sin((Math.PI * startAngle) / 180),
    };
    const end = {
      x: 50 + 50 * Math.cos((Math.PI * endAngle) / 180),
      y: 50 + 50 * Math.sin((Math.PI * endAngle) / 180),
    };

    // Generate color based on index
    const color = colors[index];

    const d = `M 50 50 L ${start.x} ${start.y} A 50 50 0 ${largeArcFlag} 1 ${end.x} ${end.y} Z`;

    return <Path key={index} d={d} fill={color} />;
  };

  return (
    <Svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      style={{ transform: [{ rotateZ: "-90deg" }] }}
    >
      {Array.from({ length: N }, (_, i) => makeSegment(i))}
    </Svg>
  );
};

export default Wheel;
