import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateFloorComponent } from './Components/create-floor/create-floor.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './Components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ListFloorsComponent } from './Components/list-floors/list-floors.component';
import { ListFloorsWithConnectionsComponent } from './Components/list-floors-with-connections/list-floors-with-connections.component';
import { EditFloorsComponent } from './Components/edit-floors/edit-floors.component';
import { CreateBuildingConnectionComponent } from './Components/create-building-connection/create-building-connection.component';
import { ListBuildingConnectionsComponent } from './Components/list-building-connections/list-building-connections.component';
import { EditBuildingConnectionsComponent } from './Components/edit-building-connections/edit-building-connections.component';
import { CreateElevatorComponent } from './Components/create-elevator/create-elevator.component';
import { ListElevatorComponent } from './Components/list-elevator/list-elevator.component';
import { LoadFloorMapComponent } from './Components/load-floor-map/load-floor-map.component';
import { EditElevatorComponent } from './Components/edit-elevator/edit-elevator.component';
import { ListFloorsWithElevatorComponent } from './Components/list-floors-with-elevator/list-floors-with-elevator.component';
import { CreateRoomComponent } from './Components/create-room/create-room.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './Modules/material/material.module';
import { TaskbarComponent } from './Components/taskbar/taskbar.component';
import { CreateBuildingComponent } from './Components/create-building/create-building.component';
import { CreateRobotComponent } from './Components/create-robot/create-robot.component';
import { CreateRobotTypeComponent } from './Components/create-robot-type/create-robot-type.component';
import { ListRobotsComponent } from './Components/list-robots/list-robots.component';
import { ListBuildingsComponent } from './Components/list-buildings/list-buildings.component';
import { ListBuildingsByMinMaxNumberOfFloorsComponent } from './Components/list-buildings-by-min-max-number-of-floors/list-buildings-by-min-max-number-of-floors.component';
import { DisableRobotComponent } from './Components/disable-robot/disable-robot.component';
import { ListRobotsTaskDesignationComponent } from './Components/list-robots-task-designation/list-robots-task-designation.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateBuildingComponent,
    ListBuildingsComponent,
    CreateFloorComponent,
    LoginComponent,
    ListFloorsComponent,
    ListFloorsWithConnectionsComponent,
    EditFloorsComponent,
    CreateBuildingConnectionComponent,
    ListBuildingConnectionsComponent,
    EditBuildingConnectionsComponent,
    CreateRoomComponent,
    CreateElevatorComponent,
    ListElevatorComponent,
    LoadFloorMapComponent,
    EditElevatorComponent,
    ListFloorsWithElevatorComponent,
    CreateRobotTypeComponent,
    CreateRobotComponent,
    DisableRobotComponent,
    ListRobotsComponent,
    ListRobotsTaskDesignationComponent,
    TaskbarComponent,
    ListBuildingsByMinMaxNumberOfFloorsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
