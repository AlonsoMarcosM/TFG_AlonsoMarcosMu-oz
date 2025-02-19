import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaProgramasComponent } from './lista-programas/lista-programas.component';
import { AgregarProgramaComponent } from './agregar-programa/agregar-programa.component';
import { EditarProgramaComponent } from './editar-programa/editar-programa.component';
import { EliminarProgramaComponent } from './eliminar-programa/eliminar-programa.component';

const routes: Routes = [
  { path: '', component: ListaProgramasComponent },                 // Caso de uso: Visualizar lista de programas
  { path: 'agregar', component: AgregarProgramaComponent },           // Caso de uso: Agregar programa
  { path: 'editar/:id', component: EditarProgramaComponent },         // Caso de uso: Editar programa (con identificación)
  { path: 'eliminar/:id', component: EliminarProgramaComponent }      // Caso de uso: Eliminar programa
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramasRoutingModule {}
