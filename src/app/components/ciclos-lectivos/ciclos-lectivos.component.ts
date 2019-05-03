import { Component } from '@angular/core';
import 'rxjs/Rx'
import { CicloLectivo } from '../../interfaces/ciclo-lectivo';
import { CiclosLectivosService } from '../../services/ciclos-lectivos.service';

@Component({
  selector: 'app-ciclos-lectivos',
  templateUrl: './ciclos-lectivos.component.html',
  styleUrls: ['./ciclos-lectivos.component.css']
})

export class CiclosLectivosComponent {

  cls:CicloLectivo[];
  loading:boolean = true;
  clDeleted:boolean = false;

  constructor(private _clService:CiclosLectivosService) { 
    this.refreshCls();
  }

  refreshCls(){
    this._clService.getCls().subscribe(data => {
      this.cls = data;
      this.loading = false;
    });
  }

  //Delete article
  deleteCl(clId: number) {
    this._clService.deleteCl(clId).subscribe(() => {
      this.refreshCls();
      this.clDeleted = true;
      document.documentElement.scrollTop = 0;
      setTimeout(() => {
        this.clDeleted = false;
       },3000);
    });
  }
}
