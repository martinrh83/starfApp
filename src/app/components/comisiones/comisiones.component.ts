import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'
import { Comision } from '../../interfaces/comision';
import { ComisionesService } from '../../services/comisiones.service';

@Component({
  selector: 'app-comisiones',
  templateUrl: './comisiones.component.html',
  styleUrls: ['./comisiones.component.css']
})
export class ComisionesComponent implements OnInit {

  comisiones:Comision[];
  loading:boolean = true;

  constructor(private _comisionService:ComisionesService) { 
     this._comisionService.getComisiones().subscribe(data => {
      this.comisiones = data;
      this.loading = false;
     });

  }

  ngOnInit() {
  }

}
