import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { FunctionComponent } from "react";
import { Colors } from "../../utils/colors";

interface ColorPickerProps {
  selectedColor: string;
  onChangeColor: (evt: SelectChangeEvent) => void;
}

const ColorPicker: FunctionComponent<ColorPickerProps> = ({
  selectedColor,
  onChangeColor,
}) => {
  return (
    <FormControl sx={{ my: 1, minWidth: 120 }} required>
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
