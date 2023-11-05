import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateFloorComponent } from './Components/create-floor/create-floor.component';
import { CreateBuildingConnectionComponent } from './Components/create-building-connection/create-building-connection.component';
import { LoginComponent } from './Components/login/login.component';
import { ListFloorsComponent } from './Components/list-floors/list-floors.component';
import { ListFloorsWithConnectionsComponent } from './Components/list-floors-with-connections/list-floors-with-connections.component';
import { EditFloorsComponent } from './Components/edit-floors/edit-floors.component';

const routes: Routes = [
  { path: 'auth/sign-in', component: LoginComponent },
  { path: 'list-floors', component: ListFloorsComponent },
  { path: 'list-floors-with-connections', component: ListFloorsWithConnectionsComponent },
  { path: 'create-floor', component: CreateFloorComponent },
  { path: 'create-building-connection', component: CreateBuildingConnectionComponent },
  { path: '', redirectTo: '', pathMatch: 'full' }, // Rota padrão
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
