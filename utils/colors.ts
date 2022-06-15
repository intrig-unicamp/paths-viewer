export const Colors = {
  Gray: "#212529",
  Red: "#c92a2a",
  Pink: "#a61e4d",
  Grape: "#862e9c",
  Violet: "#5f3dc4",
  Indigo: "#364fc7",
  Blue: "#1864ab",
  Cyan: "#0b7285",
  Teal: "#087f5b",
  Green: "#2b8a3e",
  Lime: "#5c940d",
  Yellow: "#e67700",
  Orange: "#d9480f",
};

export const getRandomColor = (): string => {
  const colors = Object.keys(Colors);
  const index = Math.floor(Math.random() * colors.length);
  const key = colors[index];

  return Colors[key];
};
