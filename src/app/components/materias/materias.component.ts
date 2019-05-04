import { Component } from '@angular/core';
import 'rxjs/Rx'
import { Materia } from '../../interfaces/materia';
import { MateriasService } from '../../services/materias.service';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})
export class MateriasComponent {

  materias:Materia[];
  loading:boolean = true;
  materiaDeleted:boolean;

  constructor(private _materiaService:MateriasService) { 
    this.refreshMaterias();
  }

  refreshMaterias(){
    this._materiaService.getMaterias().subscribe(data => {
      this.materias = data;
      this.loading = false;
    });
  }
  //Delete materia
  delete(matId: number) {
    this._materiaService.deleteMateria(matId).subscribe(() => {
      this.refreshMaterias();
      this.materiaDeleted = true;
      document.documentElement.scrollTop = 0;
      setTimeout(() => {
        this.materiaDeleted = false;
       },3000);
    });
  }

}
