import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'
import { Materia } from '../../interfaces/materia';
import { MateriasService } from '../../services/materias.service';
import { NivelesService } from '../../services/niveles.service';
import { Nivel } from '../../interfaces/nivel';

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html'
})
export class MateriaComponent implements OnInit {

  materia = new Materia;
  niveles:Nivel[];
  submitted: boolean = false;

  constructor(private _matService:MateriasService, private _nivelService:NivelesService) { 
    this._nivelService.getNiveles().subscribe(data => {
      this.niveles = data;
     });
  }

  ngOnInit() {
  }

  createMateria(materia:Materia){
    this.submitted = true;
    this._matService.createMateria(materia).subscribe(data => {return true});
  }
}