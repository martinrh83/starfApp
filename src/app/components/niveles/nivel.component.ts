import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'
import {  Nivel } from '../../interfaces/nivel';
import { NivelesService } from '../../services/niveles.service';
import { CiclosLectivosService } from '../../services/ciclos-lectivos.service';
import { CicloLectivo } from '../../interfaces/ciclo-lectivo';
import {Router} from "@angular/router";

@Component({
  selector: 'app-nivel',
  templateUrl: './nivel.component.html'
})
export class NivelComponent implements OnInit {

  nivel = new Nivel;
  cls:CicloLectivo[];
  submitted: boolean = false;
  formError: boolean = false;
  gradeSaved: boolean = false;
  errorData:any;

  constructor(private _nivelService:NivelesService, public _clService:CiclosLectivosService, private _router:Router) { 
    this._clService.getCls().subscribe(data => {
      this.cls = data;
     });
  }

  ngOnInit() {
  }

  createNivel(nivel:Nivel){
    this.submitted = true;
    this.formError = false;
    this._nivelService.createNivel(nivel).subscribe(data => {
      if(data.error){
        this.formError = true;
        this.errorData = data.data;
      }else{
        this.gradeSaved = true;
        setTimeout(() => {
          this._router.navigate(['/niveles']);
        }, 2500);
      }
    });
  }
}
