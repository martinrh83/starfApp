import { Component } from '@angular/core';
import 'rxjs/Rx'
import { Materia } from '../../interfaces/materia';
import { MateriasService } from '../../services/materias.service';
import { NivelesService } from '../../services/niveles.service';
import { Nivel } from '../../interfaces/nivel';
import {Router} from "@angular/router";

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html'
})
export class MateriaComponent {

  materia = new Materia;
  niveles:Nivel[];
  submitted: boolean = false;
  formError:boolean = false;
  errorData;
  subjectSaved:boolean = false;

  constructor(private _matService:MateriasService, private _nivelService:NivelesService, private _router:Router) { 
    this._nivelService.getNiveles().subscribe(data => {
      this.niveles = data;
     });
  }

  createMateria(materia:Materia){
    this.submitted = true;
    this.formError = false;
    this._matService.createMateria(materia).subscribe(data => {
      if(data.error){
        this.formError = true;
        this.errorData = data.data;
      }else{
        this.subjectSaved = true;
        setTimeout(() => {
          this._router.navigate(['/materias']);
        }, 1500);
      }
    });
  }
}