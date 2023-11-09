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
import { LoadFlorMapComponent } from './Components/load-flor-map/load-flor-map.component';
import { ListElevatorComponent } from './Components/list-elevator/list-elevator.component';
import { EditElevatorComponent } from './Components/edit-elevator/edit-elevator.component';
import { ListFloorsWithElevatorComponent } from './Components/list-floors-with-elevator/list-floors-with-elevator.component';
import { CreateRoomComponent } from './Components/create-room/create-room.component';

const routes: Routes = [
  { path: 'auth/sign-in', component: LoginComponent },
  { path: 'list-floors', component: ListFloorsComponent },
  { path: 'list-floors-with-connections', component: ListFloorsWithConnectionsComponent },
  { path: 'list-floors-with-elevator', component: ListFloorsWithElevatorComponent },
  { path: 'edit-floor', component: EditFloorsComponent},
  { path: 'load-floor-map', component: LoadFlorMapComponent},
  { path: 'create-elevator', component: CreateElevatorComponent },
  { path: 'list-elevator', component: ListElevatorComponent },
  { path: 'edit-elevator', component: EditElevatorComponent},
  { path: 'create-floor', component: CreateFloorComponent },
  { path: 'create-building-connection', component: CreateBuildingConnectionComponent },
  { path: 'list-building-connections', component: ListBuildingConnectionsComponent },
  { path: 'create-room', component: CreateRoomComponent },
  { path: '', redirectTo: '', pathMatch: 'full' }, // Rota padrão
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
