import { Component } from '@angular/core';
import 'rxjs/Rx'
import { Nivel } from '../../interfaces/nivel';
import { NivelesService } from '../../services/niveles.service';

@Component({
  selector: 'app-niveles',
  templateUrl: './niveles.component.html',
  styleUrls: ['./niveles.component.css']
})
export class NivelesComponent{

  niveles:Nivel[];
  loading:boolean = true;
  nivelDeleted:boolean = false;

  constructor(private _nivelService:NivelesService) {
    window.scrollTo(0, 0);
    this.refreshNiveles();
  }

  refreshNiveles(){
    this._nivelService.getNiveles().subscribe(data => {
      this.niveles = data;
      this.loading = false;
    });
  }
  //Delete nivel
  delete(nivelId: number) {
    this._nivelService.deleteNivel(nivelId).subscribe(() => {
      this.refreshNiveles();
      this.nivelDeleted = true;
      document.documentElement.scrollTop = 0;
      setTimeout(() => {
        this.nivelDeleted = false;
       },3000);
    });
  }

}
