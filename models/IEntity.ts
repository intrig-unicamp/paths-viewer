import { ICoordinatesData } from "./ICoordinatesData";

export interface IEntity {
  id: string;
  color: string;
  coordinates: ICoordinatesData[];
}
