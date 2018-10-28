import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'
import { Comision } from '../../interfaces/comision';
import { ComisionesService } from '../../services/comisiones.service';
import { NivelesService } from '../../services/niveles.service';
import { Nivel } from '../../interfaces/nivel';
import {Router} from "@angular/router";


@Component({
  selector: 'app-comision',
  templateUrl: './comision.component.html'
})
export class ComisionComponent implements OnInit {

  comision = new Comision;
  niveles:Nivel[];
  submitted: boolean = false;
  formError:boolean = false;
  errorData;
  courseSaved:boolean = false;

  constructor(private _comService:ComisionesService, private _nivelService:NivelesService, private _router:Router) { 
    this._nivelService.getNiveles().subscribe(data => {
      this.niveles = data;
     });
  }

  ngOnInit() {
  }

  createComision(comision:Comision){
    this.submitted = true;
    this.formError = false;
    this._comService.createComision(comision).subscribe(data => {
      if(data.error){
        this.formError = true;
        this.errorData = data.data;
      }else{
        this.courseSaved = true;
        setTimeout(() => {
          this._router.navigate(['/comisiones']);
        }, 2500);
      }
    });
  }
}