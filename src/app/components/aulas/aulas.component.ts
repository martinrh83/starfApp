import { Component, OnInit } from '@angular/core';
import { AulasService } from '../../services/aulas.service';
@Component({
  selector: 'app-aulas',
  templateUrl: './aulas.component.html'
})
export class AulasComponent implements OnInit {

  aulas = [];
  loading:boolean = true;

  constructor(private _aulasService:AulasService) {
    this._aulasService.getAulas().subscribe(data=>{
      this.aulas = data;
      this.loading = false;
    })
  }

  ngOnInit() {
  }

}
