import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateFloorComponent } from './Components/create-floor/create-floor.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './Components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ListFloorsComponent } from './Components/list-floors/list-floors.component';
import { ListFloorsWithConnectionsComponent } from './Components/list-floors-with-connections/list-floors-with-connections.component';
import { EditFloorsComponent } from './Components/edit-floors/edit-floors.component';
import { CreateBuildingConnectionComponent } from './Components/create-building-connection/create-building-connection.component';
import { ListBuildingConnectionsComponent } from './Components/list-building-connections/list-building-connections.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateFloorComponent,
    LoginComponent,
    ListFloorsComponent,
    ListFloorsWithConnectionsComponent,
    EditFloorsComponent,
    CreateBuildingConnectionComponent,
    ListBuildingConnectionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
