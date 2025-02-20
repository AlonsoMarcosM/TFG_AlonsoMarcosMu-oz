import { provideRouter, RouterModule, Routes } from '@angular/router';
import { ListaProgramasComponent } from './features/programas/lista-programas/lista-programas.component';
import { EjecutarProgramaComponent } from './features/programas/ejecutar-programa/ejecutar-programa.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'programas', loadChildren: () => import('./features/programas/programas.module').then(m => m.ProgramasModule) }
  
];