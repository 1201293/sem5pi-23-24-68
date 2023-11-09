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
import { CreateElevatorComponent } from './Components/create-elevator/create-elevator.component';
import { ListElevatorComponent } from './Components/list-elevator/list-elevator.component';
import { LoadFlorMapComponent } from './Components/load-flor-map/load-flor-map.component';
import { EditElevatorComponent } from './Components/edit-elevator/edit-elevator.component';
import { ListFloorsWithElevatorComponent } from './Components/list-floors-with-elevator/list-floors-with-elevator.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateBuildingComponent,
    CreateFloorComponent,
    LoginComponent,
    ListFloorsComponent,
    ListFloorsWithConnectionsComponent,
    EditFloorsComponent,
    CreateBuildingConnectionComponent,
    ListBuildingConnectionsComponent,
    //CreateRoom,
    CreateElevatorComponent,
    ListElevatorComponent,
    LoadFlorMapComponent,
    EditElevatorComponent,
    ListFloorsWithElevatorComponent
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
