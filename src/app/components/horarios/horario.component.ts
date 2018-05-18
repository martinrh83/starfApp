import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'
import { AmazingTimePickerService } from 'amazing-time-picker';
import { ComisionesService } from '../../services/comisiones.service';
import { MateriasService } from '../../services/materias.service';
import { HorariosService } from '../../services/horarios.service';
import { Comision } from '../../interfaces/comision';
import { Materia } from '../../interfaces/materia';
import { Horario } from '../../interfaces/horario';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html'
})

export class HorarioComponent implements OnInit {

  submitted: boolean = false;
  comisiones:Comision[];
  materias:Materia[];
  horario = new Horario;

  constructor(private atp: AmazingTimePickerService, private _horaService: HorariosService, private _comService: ComisionesService, private _matService: MateriasService) {
    this._comService.getComisiones().subscribe(data => {
      this.comisiones = data;
     });
    this._matService.getMaterias().subscribe(data => {
      this.materias = data;
     });
  }

  getHourInit() {
      const amazingTimePicker = this.atp.open({
          time:  this.horario.hour_init,
          locale: 'es',
          arrowStyle: {
              background: 'red',
              color: 'white'
          }
      });
      amazingTimePicker.afterClose().subscribe(time => {
          this.horario.hour_init = time;
      });
  }

  getHourEnd() {
      const amazingTimePicker = this.atp.open({
          time:  this.horario.hour_end,
          locale: 'es',
          arrowStyle: {
              background: 'red',
              color: 'white'
          }
      });
      amazingTimePicker.afterClose().subscribe(time => {
          this.horario.hour_end = time;
      });
  }

  ngOnInit() {
  }

  createHorario(horario:Horario){
    this.submitted = true;
    this._horaService.createHorario(horario).subscribe(data => {return true});
  }

}