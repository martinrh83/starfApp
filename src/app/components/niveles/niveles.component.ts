import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'
import { Nivel } from '../../interfaces/nivel';
import { NivelesService } from '../../services/niveles.service';

@Component({
  selector: 'app-niveles',
  templateUrl: './niveles.component.html',
  styleUrls: ['./niveles.component.css']
})
export class NivelesComponent implements OnInit {

  niveles:Nivel[];
  loading:boolean = true;

  constructor(private _nivelService:NivelesService) { 
     this._nivelService.getNiveles().subscribe(data => {
      this.niveles = data;
      this.loading = false;
     });

  }

  ngOnInit() {
  }

}
