import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'
import { Alumno } from '../../interfaces/alumno';
import { AlumnosService } from '../../services/alumnos.service';


@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {

  alumnos:Alumno[];
  loading:boolean = true;

  constructor(private _alumnoService:AlumnosService) { 
     this._alumnoService.getAlumnos().subscribe(data => {
      this.alumnos = data;
      this.loading = false;
     });

  }

  ngOnInit() {
  }

}
