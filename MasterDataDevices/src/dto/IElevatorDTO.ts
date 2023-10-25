
export default interface IElevatorDTO {
    id: string;
    code: string;
    name: string;
    buildingId: string;
    floorsIds: string[];
    description: string;
    posX: number;
    posY:number;
}