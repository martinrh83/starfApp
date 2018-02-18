import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'
import { Materia } from '../../interfaces/materia';
import { MateriasService } from '../../services/materias.service';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})
export class MateriasComponent implements OnInit {

  materias:Materia[];
  loading:boolean = true;

  constructor(private _materiaService:MateriasService) { 
     this._materiaService.getMaterias().subscribe(data => {
      this.materias = data;
      this.loading = false;
     });

  }

  ngOnInit() {
  }

}
