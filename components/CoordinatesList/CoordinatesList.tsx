import { Circle, Edit, ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Collapse,
  Container,
  Icon,
  IconButton,
  List,
  ListItemText,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { Fragment, FunctionComponent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../config/hooks";
import { editEntity, selectSession } from "../../features/sessions/slice";
import { IEntity } from "../../models/IEntity";
import SessionService from "../../services/SessionService";
import EntityDialog from "../EntityDialog/EntityDialog";

interface CoordinatesListProps {
  entity: IEntity;
}
const CoordinatesList: FunctionComponent<CoordinatesListProps> = ({
  entity,
}) => {
  const [label, setLabel] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [isCollapseOpen, setIsCollapseOpen] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { coordinates } = entity;
  const session = useAppSelector(selectSession);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isPostEventsMode = router.route.indexOf("real-time") >= 0;

  useEffect(() => {
    setLabel(entity.label);
    setColor(entity.color);
  }, [entity]);

  const saveEntity = async (entityData: IEntity) => {
    if (isPostEventsMode) {
      await SessionService.editEntity(session.id, entityData);
    } else {
      dispatch(editEntity(entityData));
    }

    setIsDialogOpen(false);
  };

  return (
    <Fragment>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#f1f3f5",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Icon sx={{ display: "flex", mx: 1, color }}>
            <Circle fontSize="small" />
          </Icon>

          <Typography component="span" variant="body1">
            {label}
          </Typography>
        </div>

        <div>
          <IconButton
            onClick={() => {
              setIsDialogOpen(true);
            }}
            sx={{ backgroundColor: "#f1f3f5" }}
          >
            <Edit fontSize="small" />
          </IconButton>
          <IconButton
            onClick={() => {
              setIsCollapseOpen(!isCollapseOpen);
            }}
            sx={{ backgroundColor: "#f1f3f5" }}
          >
            {isCollapseOpen ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </div>
      </div>
      <Collapse in={isCollapseOpen} timeout="auto" unmountOnExit>
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
      <EntityDialog
        entity={entity}
        isDialogOpen={isDialogOpen}
        onCancel={() => setIsDialogOpen(false)}
        onSave={saveEntity}
      />
    </Fragment>
  );
};

export default CoordinatesList;
