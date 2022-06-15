import { ICoordinatesData } from "./ICoordinatesData";

export interface IEntity {
  id: string;
  label: string;
  color: string;
  coordinates: ICoordinatesData[];
}
