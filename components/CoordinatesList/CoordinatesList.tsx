import { Circle, ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Collapse,
  Container,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Fragment, FunctionComponent, useState } from "react";
import { IFile } from "../../pages/_app";

interface CoordinatesListProps {
  file: IFile;
}
const CoordinatesList: FunctionComponent<CoordinatesListProps> = ({ file }) => {
  const [open, setOpen] = useState<boolean>(false);
  const { filename, data, color } = file;

  return (
    <Fragment>
      <ListItemButton
        onClick={() => {
          setOpen(!open);
        }}
        sx={{ backgroundColor: "#f1f3f5" }}
      >
        <ListItemIcon sx={{ minWidth: 0, mr: 2, color }}>
          <Circle fontSize="small" />
        </ListItemIcon>
        <ListItemText primary={filename} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Container sx={{ maxHeight: 200, overflow: "auto" }}>
          <List component="div" disablePadding>
            {data?.map((row, index) => (
              <ListItemText
                key={`coordinate-${index}`}
                primary={`${row.latitude}, ${row.longitude}`}
              />
            ))}
          </List>
        </Container>
      </Collapse>
    </Fragment>
  );
};

export default CoordinatesList;
