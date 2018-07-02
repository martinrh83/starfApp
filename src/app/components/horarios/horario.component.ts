import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'
import { AmazingTimePickerService } from 'amazing-time-picker';
import { MateriasService } from '../../services/materias.service';
import { HorariosService } from '../../services/horarios.service';
import { Materia } from '../../interfaces/materia';
import { Horario } from '../../interfaces/horario';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html'
})

export class HorarioComponent implements OnInit {
  comision_id:any;
  submitted: boolean = false;
  materias:Materia[];
  horario = new Horario;

  constructor(private atp: AmazingTimePickerService, private _horaService: HorariosService, private _matService: MateriasService, private router:ActivatedRoute, private _router:Router) {
    this.router.params.subscribe( params => {
        this.comision_id = params['com_id'];
        this.horario.course_id = this.comision_id;
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
    this._horaService.createHorario(horario, this.horario.course_id.toString()).subscribe(data => {return true});
    this._router.navigate(['/horarios/', this.comision_id]);
  }

}