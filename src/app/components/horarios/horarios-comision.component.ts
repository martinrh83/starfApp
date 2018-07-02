import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'
import { Horario } from '../../interfaces/horario';
import { TablaHorario } from '../../interfaces/tablaHorario';
import { HorariosService } from '../../services/horarios.service';
import { DatePipe } from '@angular/common';
import { CicloLectivo } from '../../interfaces/ciclo-lectivo';
import { CiclosLectivosService } from '../../services/ciclos-lectivos.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-horarios-comision',
  templateUrl: './horarios-comision.component.html'
})





export class HorariosComisionComponent implements OnInit {
  id_comision:string;
  loading:boolean = true;
  horarios: Horario[] = [];
  dias:string [] = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];
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
    {"day": "Viernes", "hour_init": "08:45", "hour_end": "09:30", "course": "4k6"},
    {"day": "Lunes", "hour_init": "09:30", "hour_end": "10:15", "course": "4k6"},
    {"day": "Martes", "hour_init": "09:30", "hour_end": "10:15", "course": "4k6"},
    {"day": "Miercoles", "hour_init": "09:30", "hour_end": "10:15", "course": "4k6"},
    {"day": "Jueves", "hour_init": "09:30", "hour_end": "10:15", "course": "4k6"},
    {"day": "Viernes", "hour_init": "09:30", "hour_end": "10:15", "course": "4k6"},
    {"day": "Lunes", "hour_init": "10:15", "hour_end": "11:00", "course": "4k6"},
    {"day": "Martes", "hour_init": "10:15", "hour_end": "11:00", "course": "4k6"},
    {"day": "Miercoles", "hour_init": "10:15", "hour_end": "11:00", "course": "4k6"},
    {"day": "Jueves", "hour_init": "10:15", "hour_end": "11:00", "course": "4k6"},
    {"day": "Viernes", "hour_init": "10:15", "hour_end": "11:00", "course": "4k6"},
    {"day": "Lunes", "hour_init": "11:00", "hour_end": "11:45", "course": "4k6"},
    {"day": "Martes", "hour_init": "11:00", "hour_end": "11:45", "course": "4k6"},
    {"day": "Miercoles", "hour_init": "11:00", "hour_end": "11:45", "course": "4k6"},
    {"day": "Jueves", "hour_init": "11:00", "hour_end": "11:45", "course": "4k6"},
    {"day": "Viernes", "hour_init": "11:00", "hour_end": "11:45", "course": "4k6"},
    {"day": "Lunes", "hour_init": "11:45", "hour_end": "12:30", "course": "4k6"},
    {"day": "Martes", "hour_init": "11:45", "hour_end": "12:30", "course": "4k6"},
    {"day": "Miercoles", "hour_init": "11:45", "hour_end": "12:30", "course": "4k6"},
    {"day": "Jueves", "hour_init": "11:45", "hour_end": "12:30", "course": "4k6"},
    {"day": "Viernes", "hour_init": "11:45", "hour_end": "12:30", "course": "4k6"},
    {"day": "Lunes", "hour_init": "12:30", "hour_end": "13:15", "course": "4k6"},
    {"day": "Martes", "hour_init": "12:30", "hour_end": "13:15", "course": "4k6"},
    {"day": "Miercoles", "hour_init": "12:30", "hour_end": "13:15", "course": "4k6"},
    {"day": "Jueves", "hour_init": "12:30", "hour_end": "13:15", "course": "4k6"},
    {"day": "Viernes", "hour_init": "12:30", "hour_end": "13:15", "course": "4k6"}

  ];

  constructor(private router:ActivatedRoute, private _horariosService: HorariosService, private datePipe: DatePipe) {
    this.router.params.subscribe( params => {
            this.id_comision = params['com_id']; 
            this.getHorario(this.id_comision);
        });
  }



  filterByDay(horas:Horario[]){
    for (var dia of this.dias){
      var horasFiltradas = horas.filter(hora => hora.day == dia);
      this.filterByHour(horasFiltradas, dia);
    }
    //console.log(this.datePipe.transform("Sat, 01 Jan 2000 09:45:00 -03 -03:00", 'HH:mm'));
    //console.log(this.arrayHorario);
  }

  filterByHour(horaXdia:any, dia:string){
    for (var value of horaXdia) {
      let hora = this.datePipe.transform(value.hour_init, 'HH:mm');
      for(var item of this.arrayHorario){
        if(item.day == dia && item.hour_init == hora ){
          item["subject"] = value;
        }
      }
    }
  }

  getHorario(id:any){
    this._horariosService.getHorario(id).subscribe(data => {
      //console.log(data);
      this.horarios = data;
      this.filterByDay(this.horarios);

    })
  }


  ngOnInit() {

  }

  
}
