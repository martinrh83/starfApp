import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'
import { Horario } from '../../interfaces/horario';
import { TablaHorario } from '../../interfaces/tablaHorario';
import { HorariosService } from '../../services/horarios.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']
})





export class HorariosComponent implements OnInit {

  prueba:any;
  horarios: Horario[] = [];
  arrayHorario: TablaHorario [] = [

    {"day": "Lunes", "hour_init": "08:00", "hour_end": "08:45", "course": "4k6"},
    {"day": "Martes", "hour_init": "08:00", "hour_end": "08:45", "course": "4k6"},
    {"day": "Miercoles", "hour_init": "08:00", "hour_end": "08:45", "course": "4k6"},
    {"day": "Jueves", "hour_init": "08:00", "hour_end": "08:45", "course": "4k6"},
    {"day": "Viernes", "hour_init": "08:00", "hour_end": "08:45", "course": "4k6"},
    {"day": "Lunes", "hour_init": "08:45", "hour_end": "09:30", "course": "4k6"},
    {"day": "Martes", "hour_init": "08:45", "hour_end": "09:30", "course": "4k6"},
    {"day": "Miercoles", "hour_init": "08:45", "hour_end": "09:30", "course": "4k6"},
    {"day": "Jueves", "hour_init": "08:45", "hour_end": "09:30", "course": "4k6"},
    {"day": "Viernes", "hour_init": "08:45", "hour_end": "09:30", "course": "4k6"}

  ];

  constructor(private _horariosService: HorariosService, private datePipe: DatePipe) {

  }

  ngOnInit() {
    //const filterByCourse = (horas:Horario[]) =>
    //  horas.filter(hora => hora.day == "Lunes");
    const filterByCourse = (horas:any[]) =>
      horas.filter(hora => this.datePipe.transform(hora.hour_init, 'HH:mm') == "08:00");

    this._horariosService.getHorarios().subscribe(data => {
      this.horarios = data;
      //console.log(this.horarios);

      let filterbyAge = filterByCourse(this.horarios);
      console.log(filterbyAge);

      console.log( this.datePipe.transform("2000-01-01T19:30:16.921Z", 'HH:mm'))
     });

    //console.log(filterbyAge);
    //console.log(this.prueba);
  }

  
}
