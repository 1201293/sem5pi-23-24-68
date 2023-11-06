export interface Floor {
  id?: string;
  buildingId?: string;
  number?: number;
  description?: string;
  map?: number[][];
  initialPosition?: number[];
  initialDirection?: number;
}
