import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { FunctionComponent } from "react";
import "./ColorPicker.css";

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

interface ColorPickerProps {
  selectedColor: string;
  onChangeColor: (evt: SelectChangeEvent) => void;
}

const ColorPicker: FunctionComponent<ColorPickerProps> = ({
  selectedColor,
  onChangeColor,
}) => {
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="color-picker-label">Color</InputLabel>
      <Select
        size="small"
        labelId="color-picker-label"
        className="color-picker"
        label="Color"
        value={selectedColor}
        onChange={onChangeColor}
      >
        {Object.keys(Colors).map((color) => (
          <MenuItem
            key={color}
            value={Colors[color]}
            sx={{
              color: Colors[color],
            }}
          >
            <div
              className="color-circle"
              style={{
                backgroundColor: Colors[color],
              }}
            ></div>
            {color}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
export default ColorPicker;
