import { Component, OnInit } from '@angular/core';
import { ProgramasService } from '../../../services/programas.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';


@Component({
  selector: 'app-lista-programas',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './lista-programas.component.html',
  styleUrls: ['./lista-programas.component.css']
})
export class ListaProgramasComponent implements OnInit {
  programas: any[] = [];
  Array = Array; // Agrega esta línea

  constructor(private programasService: ProgramasService) {}

  ngOnInit(): void {
    this.cargarProgramas();
  }

  cargarProgramas(): void {
    this.programasService.refresh().subscribe(() => {
      this.programasService.listarProgramas().subscribe(data => {
        this.programas = data;
      });
    });
  }
  
}

