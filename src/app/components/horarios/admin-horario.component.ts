import { Component } from '@angular/core';
import 'rxjs/Rx'
import {ActivatedRoute, Router} from "@angular/router";
import { HorariosService } from '../../services/horarios.service';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-admin-horario',
  templateUrl: './admin-horario.component.html',
  styleUrls: ['./admin-horario.component.css']
})

export class AdminHorarioComponent {
  loading:boolean = true;
  horario_id:number;
  formatedDays:any = [];
  schedule:any;
  hora_inicio:any;
  hora_fin:any;
  constructor(private _router:Router, private router:ActivatedRoute, private _horariosService: HorariosService, private datePipe: DatePipe){
    this.router.params.subscribe( params => {
      this.horario_id = params['horario_id'];
      this._horariosService.getSchedule(this.horario_id).subscribe( data => {
        console.log(data);
        this.schedule = data;
        this.hora_inicio = this.datePipe.transform(this.schedule.timetable.hour_init, 'HH:mm')
        this.hora_fin = this.datePipe.transform(this.schedule.timetable.hour_end, 'HH:mm')
        this.formatedDays = data.calendar_days.map(day =>(moment(day.fecha).format('dddd, DD/MM/YYYY')));
        //console.log(this.formatedDays);
      });
  });
  }
}