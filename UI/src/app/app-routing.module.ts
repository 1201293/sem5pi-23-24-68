import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateFloorComponent } from './Components/create-floor/create-floor.component';
import { CreateBuildingConnectionComponent } from './Components/create-building-connection/create-building-connection.component';
import { ListBuildingConnectionsComponent } from './Components/list-building-connections/list-building-connections.component';
import { LoginComponent } from './Components/login/login.component';
import { ListFloorsComponent } from './Components/list-floors/list-floors.component';
import { ListFloorsWithConnectionsComponent } from './Components/list-floors-with-connections/list-floors-with-connections.component';
import { EditFloorsComponent } from './Components/edit-floors/edit-floors.component';
import { CreateElevatorComponent } from './Components/create-elevator/create-elevator.component';
import { LoadFloorMapComponent } from './Components/load-floor-map/load-floor-map.component';
import { ListElevatorComponent } from './Components/list-elevator/list-elevator.component';
import { EditElevatorComponent } from './Components/edit-elevator/edit-elevator.component';
import { ListFloorsWithElevatorComponent } from './Components/list-floors-with-elevator/list-floors-with-elevator.component';
import { CreateRoomComponent } from './Components/create-room/create-room.component';
import { CreateBuildingComponent } from './Components/create-building/create-building.component';
import { ListBuildingsComponent } from './Components/list-buildings/list-buildings.component';
import { ListBuildingsByMinMaxNumberOfFloorsComponent } from './Components/list-buildings-by-min-max-number-of-floors/list-buildings-by-min-max-number-of-floors.component';
import { CreateRobotTypeComponent } from './Components/create-robot-type/create-robot-type.component';
import { CreateRobotComponent } from './Components/create-robot/create-robot.component';
import { DisableRobotComponent } from './Components/disable-robot/disable-robot.component';
import { ListRobotsComponent } from './Components/list-robots/list-robots.component';
import { ListRobotsTaskDesignationComponent } from './Components/list-robots-task-designation/list-robots-task-designation.component';

const routes: Routes = [
  { path: 'auth/sign-in', component: LoginComponent }, 
  { path: 'create-building', component: CreateBuildingComponent},
  { path: 'list-buildings', component: ListBuildingsComponent},
  { path: 'list-buildings-by-min-max-number-of-floors', component: ListBuildingsByMinMaxNumberOfFloorsComponent},
  { path: 'list-floors', component: ListFloorsComponent },
  { path: 'list-floors-with-connections', component: ListFloorsWithConnectionsComponent },
  { path: 'list-floors-with-elevator', component: ListFloorsWithElevatorComponent },
  { path: 'edit-floor', component: EditFloorsComponent},
  { path: 'load-floor-map', component: LoadFloorMapComponent},
  { path: 'create-elevator', component: CreateElevatorComponent },
  { path: 'list-elevator', component: ListElevatorComponent },
  { path: 'edit-elevator', component: EditElevatorComponent},
  { path: 'create-floor', component: CreateFloorComponent },
  { path: 'create-building-connection', component: CreateBuildingConnectionComponent },
  { path: 'list-building-connections', component: ListBuildingConnectionsComponent },
  { path: 'create-room', component: CreateRoomComponent },
  { path: 'create-robot-type', component: CreateRobotTypeComponent },
  { path: 'create-robot', component: CreateRobotComponent },
  { path: 'disable-robot', component: DisableRobotComponent },
  { path: 'list-robots', component: ListRobotsComponent },
  { path: 'list-robots-task-designation', component: ListRobotsTaskDesignationComponent },
  { path: '', redirectTo: '', pathMatch: 'full' }, // Rota padrão
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
