import { useEffect, useState } from "react";
import colorName from "color-name";

interface Color {
  [key: string]: string;
}

export const useColorGenerator = (N: number): string[] => {
  const [colors, setColors] = useState<Color>({});

  useEffect(() => {
    const allColorNames = Object.keys(colorName);

    for (let i = allColorNames.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allColorNames[i], allColorNames[j]] = [
        allColorNames[j],
        allColorNames[i],
      ];
    }

    const colors = allColorNames.reduce((obj: Color, name, i) => {
      if (i < N) {
        const [r, g, b] = (colorName as any)[name];
        obj[name] = `rgb(${r}, ${g}, ${b})`;
      }
      return obj;
    }, {});

    setColors(colors);
  }, [N]);

  const colorNames = Object.keys(colors);

  return colorNames;
};
