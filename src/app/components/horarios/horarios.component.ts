import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'
import { CicloLectivo } from '../../interfaces/ciclo-lectivo';
import { CiclosLectivosService } from '../../services/ciclos-lectivos.service';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']
})





export class HorariosComponent implements OnInit {
  cls:CicloLectivo[];
  loading:boolean = true;

  constructor(private _clService: CiclosLectivosService){
    this._clService.getCls().subscribe(data => {
      this.cls = data;
      this.loading = false;
     });
  }

  ngOnInit() {
  }  
}
