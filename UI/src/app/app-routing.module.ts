import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateFloorComponent } from './Components/create-floor/create-floor.component';

const routes: Routes = [
  { path: 'floor', component: CreateFloorComponent },
  { path: '', redirectTo: '', pathMatch: 'full' }, // Rota padrão
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
