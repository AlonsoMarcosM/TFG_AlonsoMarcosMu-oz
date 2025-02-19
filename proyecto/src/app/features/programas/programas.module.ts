import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ListaProgramasComponent } from './lista-programas/lista-programas.component';
import { AgregarProgramaComponent } from './agregar-programa/agregar-programa.component';
import { EditarProgramaComponent } from './editar-programa/editar-programa.component';
import { EliminarProgramaComponent } from './eliminar-programa/eliminar-programa.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ListaProgramasComponent,
    AgregarProgramaComponent,
    EditarProgramaComponent,
    EliminarProgramaComponent
  ]
})
export class ProgramasModule { }
