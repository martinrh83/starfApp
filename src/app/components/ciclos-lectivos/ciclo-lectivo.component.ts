import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'
import { CicloLectivo } from '../../interfaces/ciclo-lectivo';
import { CiclosLectivosService } from '../../services/ciclos-lectivos.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-ciclo-lectivo',
  templateUrl: './ciclo-lectivo.component.html'
})
export class CicloLectivoComponent implements OnInit {

  cl = new CicloLectivo;
  submitted: boolean = false;
  formError:boolean = false;
  errorData;
  anioSaved:boolean = false;

  constructor(private _clService:CiclosLectivosService, private _router:Router) { 

  }

  ngOnInit() {
  }

  createCl(cl:CicloLectivo){
    this.submitted = true;
    this.formError  = false;
    this._clService.createCl(cl).subscribe(data => {
      if(data.error){
        this.formError = true;
        this.errorData = data.data;
      }else{
        this.anioSaved = true;
        setTimeout(() => {
          this._router.navigate(['/ciclos-lectivos']);
        }, 2500);
      }
    });
  }
}
