import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateFloorComponent } from './Components/create-floor/create-floor.component';
import { LoginComponent } from './Components/login/login.component';
import { ListFloorsComponent } from './Components/list-floors/list-floors.component';

const routes: Routes = [
  { path: 'auth/sign-in', component: LoginComponent },
  { path: 'list-floors', component: ListFloorsComponent },
  { path: 'create-floor', component: CreateFloorComponent },
  { path: '', redirectTo: '', pathMatch: 'full' }, // Rota padrão
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
