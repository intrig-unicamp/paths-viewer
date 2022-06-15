import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { FunctionComponent, useEffect, useState } from "react";
import ColorPicker from "../ColorPicker/ColorPicker";

interface EntityDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  label: string;
  setLabel: (label: string) => void;
  color: string;
  setColor: (color: string) => void;
}
const EntityDialog: FunctionComponent<EntityDialogProps> = ({
  open,
  setOpen,
  label,
  setLabel,
  color,
  setColor,
}) => {
  const [currentColor, setCurrentColor] = useState<string>("");
  const [currentLabel, setCurrentLabel] = useState<string>("");

  useEffect(() => {
    setCurrentColor(color);
    setCurrentLabel(label);
  }, [open]);

  const handleSubmit = () => {
    setColor(currentColor);
    setLabel(currentLabel);
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit entity</DialogTitle>

        <DialogContent>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ justifyContent: "flex-start", paddingRight: 8 }}>
                <ColorPicker
                  selectedColor={currentColor}
                  onChangeColor={(evt) => setCurrentColor(evt.target.value)}
                />
              </div>
              <TextField
                id="label"
                name="label"
                label="Label"
                size="small"
                value={currentLabel}
                required
                autoFocus
                onChange={(evt) => setCurrentLabel(evt.target.value)}
                sx={{ alignSelf: "center" }}
              />
            </div>
            <Button
              onClick={handleSubmit}
              type="button"
              fullWidth
              variant="contained"
            >
              Save
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EntityDialog;
