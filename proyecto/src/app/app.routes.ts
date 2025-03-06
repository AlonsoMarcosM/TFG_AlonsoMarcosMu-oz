import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './auth.guard'; // Asegúrate de implementarlo

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { 
    path: 'programas', 
    loadChildren: () => import('./features/programas/programas.module').then(m => m.ProgramasModule),
    canActivate: [AuthGuard]
  }
];
