import { Component } from '@angular/core';
import 'rxjs/Rx'
import { Comision } from '../../interfaces/comision';
import { ComisionesService } from '../../services/comisiones.service';

@Component({
  selector: 'app-comisiones',
  templateUrl: './comisiones.component.html',
  styleUrls: ['./comisiones.component.css']
})
export class ComisionesComponent {

  comisiones:Comision[];
  loading:boolean = true;
  comisionDeleted:boolean = false;

  constructor(private _comisionService:ComisionesService) { 
    this.refreshComisiones();
  }

  refreshComisiones(){
    this._comisionService.getComisiones().subscribe(data => {
      this.comisiones = data;
      this.loading = false;
    });
  }
  //Delete comision
  delete(comId: number) {
    this._comisionService.deleteComision(comId).subscribe(() => {
      this.refreshComisiones();
      this.comisionDeleted = true;
      document.documentElement.scrollTop = 0;
      setTimeout(() => {
        this.comisionDeleted = false;
       },3000);
    });
  }
}
