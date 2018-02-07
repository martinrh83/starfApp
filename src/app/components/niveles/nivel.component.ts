import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'
import {  Nivel } from '../../interfaces/nivel';
import { NivelesService } from '../../services/niveles.service';
import { CiclosLectivosService } from '../../services/ciclos-lectivos.service';
import { CicloLectivo } from '../../interfaces/ciclo-lectivo';


@Component({
  selector: 'app-nivel',
  templateUrl: './nivel.component.html'
})
export class NivelComponent implements OnInit {

  nivel = new Nivel;
  cls:CicloLectivo[];
  submitted: boolean = false;

  constructor(private _nivelService:NivelesService, public _clService:CiclosLectivosService) { 
    this._clService.getCls().subscribe(data => {
      this.cls = data;
     });
  }

  ngOnInit() {
  }

  createNivel(nivel:Nivel){
    this.submitted = true;

    this._nivelService.createNivel(nivel).subscribe(data => {return true});
  }
}
