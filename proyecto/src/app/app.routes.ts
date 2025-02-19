import { provideRouter, RouterModule, Routes } from '@angular/router';
import { ListaProgramasComponent } from './features/programas/lista-programas/lista-programas.component';
import { ProgramFormComponent } from './program-form.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: '', component: ProgramFormComponent },
  { path: 'programas', component: ListaProgramasComponent }
];

export const appRouterProviders = [
  provideRouter(routes)
];

