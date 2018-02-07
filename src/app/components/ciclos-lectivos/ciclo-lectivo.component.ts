import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'
import { CicloLectivo } from '../../interfaces/ciclo-lectivo';
import { CiclosLectivosService } from '../../services/ciclos-lectivos.service';

@Component({
  selector: 'app-ciclo-lectivo',
  templateUrl: './ciclo-lectivo.component.html'
})
export class CicloLectivoComponent implements OnInit {

  cl = new CicloLectivo;
  submitted: boolean = false;

  constructor(private _clService:CiclosLectivosService) { 

  }

  ngOnInit() {
  }

  createCl(cl:CicloLectivo){
    this.submitted = true;
    this._clService.createCl(cl).subscribe(data => {return true});
  }
}
