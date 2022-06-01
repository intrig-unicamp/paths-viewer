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
import { IEntity } from "../../models/IEntity";

interface CoordinatesListProps {
  entity: IEntity;
}
const CoordinatesList: FunctionComponent<CoordinatesListProps> = ({
  entity,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const { id, color, coordinates } = entity;

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
        <ListItemText primary={id} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Container sx={{ maxHeight: 200, overflow: "auto" }}>
          <List component="div" disablePadding>
            {coordinates?.map((row, index) => (
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
