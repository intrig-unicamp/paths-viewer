import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { FunctionComponent, useEffect, useState } from "react";
import { IEntity } from "../../models/IEntity";
import ColorPicker from "../ColorPicker/ColorPicker";

interface EntityDialogProps {
  entity: IEntity;
  isDialogOpen: boolean;
  onSave: (entity: IEntity) => void;
  onCancel: () => void;
}
const EntityDialog: FunctionComponent<EntityDialogProps> = ({
  entity,
  isDialogOpen,
  onSave,
  onCancel,
}) => {
  const { color, label } = entity;
  const [currentColor, setCurrentColor] = useState<string>("");
  const [currentLabel, setCurrentLabel] = useState<string>("");

  useEffect(() => {
    setCurrentColor(color);
    setCurrentLabel(label);
  }, [isDialogOpen]);

  return (
    <div>
      <Dialog open={isDialogOpen} onClose={onCancel}>
        <DialogTitle>Edit entity</DialogTitle>

        <DialogContent>
          <Box component="form" noValidate sx={{ mt: 1 }}>
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
              onClick={() =>
                onSave({ ...entity, label: currentLabel, color: currentColor })
              }
              type="button"
              fullWidth
              variant="contained"
            >
              Save
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EntityDialog;
