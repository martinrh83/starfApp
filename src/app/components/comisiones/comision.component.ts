import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'
import { Comision } from '../../interfaces/comision';
import { ComisionesService } from '../../services/comisiones.service';
import { NivelesService } from '../../services/niveles.service';
import { Nivel } from '../../interfaces/nivel';

@Component({
  selector: 'app-comision',
  templateUrl: './comision.component.html'
})
export class ComisionComponent implements OnInit {

  comision = new Comision;
  niveles:Nivel[];
  submitted: boolean = false;

  constructor(private _comService:ComisionesService, private _nivelService:NivelesService) { 
    this._nivelService.getNiveles().subscribe(data => {
      this.niveles = data;
     });
  }

  ngOnInit() {
  }

  createComision(comision:Comision){
    this.submitted = true;
    this._comService.createComision(comision).subscribe(data => {return true});
  }
}