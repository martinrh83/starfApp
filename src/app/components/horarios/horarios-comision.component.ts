import { Component } from '@angular/core';
import 'rxjs/Rx'
import { Horario } from '../../interfaces/horario';
import { TablaHorario } from '../../interfaces/tablaHorario';
import { HorariosService } from '../../services/horarios.service';
import { DatePipe } from '@angular/common';
import { ComisionesService } from '../../services/comisiones.service';
import {ActivatedRoute , Router} from "@angular/router";

@Component({
  selector: 'app-horarios-comision',
  templateUrl: './horarios-comision.component.html'
})

export class HorariosComisionComponent {
  id_comision:string;
  comisionTurno:any;
  loading:boolean = true;
  horarios: Horario[] = [];
  dias:string [] = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];
  horarioSelected= [];
  arrayHorarioMañana: TablaHorario [] = [

    {"day": "Lunes", "hour_init": "08:00", "hour_end": "08:45"},
    {"day": "Martes", "hour_init": "08:00", "hour_end": "08:45"},
    {"day": "Miercoles", "hour_init": "08:00", "hour_end": "08:45"},
    {"day": "Jueves", "hour_init": "08:00", "hour_end": "08:45"},
    {"day": "Viernes", "hour_init": "08:00", "hour_end": "08:45"},
    {"day": "Lunes", "hour_init": "08:45", "hour_end": "09:30"},
    {"day": "Martes", "hour_init": "08:45", "hour_end": "09:30"},
    {"day": "Miercoles", "hour_init": "08:45", "hour_end": "09:30"},
    {"day": "Jueves", "hour_init": "08:45", "hour_end": "09:30"},
    {"day": "Viernes", "hour_init": "08:45", "hour_end": "09:30"},
    {"day": "Lunes", "hour_init": "09:30", "hour_end": "10:15"},
    {"day": "Martes", "hour_init": "09:30", "hour_end": "10:15"},
    {"day": "Miercoles", "hour_init": "09:30", "hour_end": "10:15"},
    {"day": "Jueves", "hour_init": "09:30", "hour_end": "10:15"},
    {"day": "Viernes", "hour_init": "09:30", "hour_end": "10:15"},
    {"day": "Lunes", "hour_init": "10:15", "hour_end": "11:00"},
    {"day": "Martes", "hour_init": "10:15", "hour_end": "11:00"},
    {"day": "Miercoles", "hour_init": "10:15", "hour_end": "11:00"},
    {"day": "Jueves", "hour_init": "10:15", "hour_end": "11:00"},
    {"day": "Viernes", "hour_init": "10:15", "hour_end": "11:00"},
    {"day": "Lunes", "hour_init": "11:00", "hour_end": "11:45"},
    {"day": "Martes", "hour_init": "11:00", "hour_end": "11:45"},
    {"day": "Miercoles", "hour_init": "11:00", "hour_end": "11:45"},
    {"day": "Jueves", "hour_init": "11:00", "hour_end": "11:45"},
    {"day": "Viernes", "hour_init": "11:00", "hour_end": "11:45"},
    {"day": "Lunes", "hour_init": "11:45", "hour_end": "12:30"},
    {"day": "Martes", "hour_init": "11:45", "hour_end": "12:30"},
    {"day": "Miercoles", "hour_init": "11:45", "hour_end": "12:30"},
    {"day": "Jueves", "hour_init": "11:45", "hour_end": "12:30"},
    {"day": "Viernes", "hour_init": "11:45", "hour_end": "12:30"},
    {"day": "Lunes", "hour_init": "12:30", "hour_end": "13:15"},
    {"day": "Martes", "hour_init": "12:30", "hour_end": "13:15"},
    {"day": "Miercoles", "hour_init": "12:30", "hour_end": "13:15"},
    {"day": "Jueves", "hour_init": "12:30", "hour_end": "13:15"},
    {"day": "Viernes", "hour_init": "12:30", "hour_end": "13:15"}

  ];

  arrayHorarioTarde: TablaHorario [] = [

    {"day": "Lunes", "hour_init": "13:15", "hour_end": "14:00"},
    {"day": "Martes", "hour_init": "13:15", "hour_end": "14:00"},
    {"day": "Miercoles", "hour_init": "13:15", "hour_end": "14:00"},
    {"day": "Jueves", "hour_init": "13:15", "hour_end": "14:45"},
    {"day": "Viernes", "hour_init": "13:15", "hour_end": "14:00"},
    {"day": "Lunes", "hour_init": "14:00", "hour_end": "14:45"},
    {"day": "Martes", "hour_init": "14:00", "hour_end": "14:45"},
    {"day": "Miercoles", "hour_init": "14:00", "hour_end": "14:45"},
    {"day": "Jueves", "hour_init": "14:00", "hour_end": "14:45"},
    {"day": "Viernes", "hour_init": "14:00", "hour_end": "14:45"},
    {"day": "Lunes", "hour_init": "14:45", "hour_end": "15:30"},
    {"day": "Martes", "hour_init": "14:45", "hour_end": "15:30"},
    {"day": "Miercoles", "hour_init": "14:45", "hour_end": "15:30"},
    {"day": "Jueves", "hour_init": "14:45", "hour_end": "15:30"},
    {"day": "Viernes", "hour_init": "14:45", "hour_end": "15:30"},
    {"day": "Lunes", "hour_init": "15:30", "hour_end": "16:15"},
    {"day": "Martes", "hour_init": "15:30", "hour_end": "16:15"},
    {"day": "Miercoles", "hour_init": "15:30", "hour_end": "16:15"},
    {"day": "Jueves", "hour_init": "15:30", "hour_end": "16:15"},
    {"day": "Viernes", "hour_init": "15:30", "hour_end": "16:15"},
    {"day": "Lunes", "hour_init": "16:15", "hour_end": "17:00"},
    {"day": "Martes", "hour_init": "16:15", "hour_end": "17:00"},
    {"day": "Miercoles", "hour_init": "16:15", "hour_end": "17:00"},
    {"day": "Jueves", "hour_init": "16:15", "hour_end": "17:00"},
    {"day": "Viernes", "hour_init": "16:15", "hour_end": "17:00"},
    {"day": "Lunes", "hour_init": "17:00", "hour_end": "17:45"},
    {"day": "Martes", "hour_init": "17:00", "hour_end": "17:45"},
    {"day": "Miercoles", "hour_init": "17:00", "hour_end": "17:45"},
    {"day": "Jueves", "hour_init": "17:00", "hour_end": "17:45"},
    {"day": "Viernes", "hour_init": "17:00", "hour_end": "17:45"},
    {"day": "Lunes", "hour_init": "17:45", "hour_end": "18:30"},
    {"day": "Martes", "hour_init": "17:45", "hour_end": "18:30"},
    {"day": "Miercoles", "hour_init": "17:45", "hour_end": "18:30"},
    {"day": "Jueves", "hour_init": "17:45", "hour_end": "18:30"},
    {"day": "Viernes", "hour_init": "17:45", "hour_end": "18:30"},
    {"day": "Lunes", "hour_init": "18:30", "hour_end": "19:15"},
    {"day": "Martes", "hour_init": "18:30", "hour_end": "19:15"},
    {"day": "Miercoles", "hour_init": "18:30", "hour_end": "19:15"},
    {"day": "Jueves", "hour_init": "18:30", "hour_end": "19:15"},
    {"day": "Viernes", "hour_init": "18:30", "hour_end": "19:15"}

  ];

  arrayHorarioNoche: TablaHorario [] = [

    {"day": "Lunes", "hour_init": "18:15", "hour_end": "19:00"},
    {"day": "Martes", "hour_init": "18:15", "hour_end": "19:00"},
    {"day": "Miercoles", "hour_init": "18:15", "hour_end": "19:00"},
    {"day": "Jueves", "hour_init": "18:15", "hour_end": "19:45"},
    {"day": "Viernes", "hour_init": "18:15", "hour_end": "19:00"},
    {"day": "Lunes", "hour_init": "19:00", "hour_end": "19:45"},
    {"day": "Martes", "hour_init": "19:00", "hour_end": "19:45"},
    {"day": "Miercoles", "hour_init": "19:00", "hour_end": "19:45"},
    {"day": "Jueves", "hour_init": "19:00", "hour_end": "19:45"},
    {"day": "Viernes", "hour_init": "19:00", "hour_end": "19:45"},
    {"day": "Lunes", "hour_init": "19:45", "hour_end": "20:30"},
    {"day": "Martes", "hour_init": "19:45", "hour_end": "20:30"},
    {"day": "Miercoles", "hour_init": "19:45", "hour_end": "20:30"},
    {"day": "Jueves", "hour_init": "19:45", "hour_end": "20:30"},
    {"day": "Viernes", "hour_init": "19:45", "hour_end": "20:30"},
    {"day": "Lunes", "hour_init": "20:30", "hour_end": "21:15"},
    {"day": "Martes", "hour_init": "20:30", "hour_end": "21:15"},
    {"day": "Miercoles", "hour_init": "20:30", "hour_end": "21:15"},
    {"day": "Jueves", "hour_init": "20:30", "hour_end": "21:15"},
    {"day": "Viernes", "hour_init": "20:30", "hour_end": "21:15"},
    {"day": "Lunes", "hour_init": "21:15", "hour_end": "22:00"},
    {"day": "Martes", "hour_init": "21:15", "hour_end": "22:00"},
    {"day": "Miercoles", "hour_init": "21:15", "hour_end": "22:00"},
    {"day": "Jueves", "hour_init": "21:15", "hour_end": "22:00"},
    {"day": "Viernes", "hour_init": "21:15", "hour_end": "22:00"},
    {"day": "Lunes", "hour_init": "22:00", "hour_end": "22:45"},
    {"day": "Martes", "hour_init": "22:00", "hour_end": "22:45"},
    {"day": "Miercoles", "hour_init": "22:00", "hour_end": "22:45"},
    {"day": "Jueves", "hour_init": "22:00", "hour_end": "22:45"},
    {"day": "Viernes", "hour_init": "22:00", "hour_end": "22:45"},
    {"day": "Lunes", "hour_init": "22:45", "hour_end": "23:30"},
    {"day": "Martes", "hour_init": "22:45", "hour_end": "23:30"},
    {"day": "Miercoles", "hour_init": "22:45", "hour_end": "23:30"},
    {"day": "Jueves", "hour_init": "22:45", "hour_end": "23:30"},
    {"day": "Viernes", "hour_init": "22:45", "hour_end": "23:30"}

  ];

  constructor(private router:ActivatedRoute, private _horariosService: HorariosService, private datePipe: DatePipe, private _comisionService:ComisionesService, private _router:Router) {
    window.scrollTo(0, 0);
    this.router.params.subscribe( params => {
            this.id_comision = params['com_id'];
            this._comisionService.getComision(this.id_comision).subscribe(data => {
                this.comisionTurno = data.turno;
                if(this.comisionTurno == 'Mañana'){
                    this.horarioSelected = this.arrayHorarioMañana;
                    this.getHorario(this.id_comision, this.horarioSelected);
                }else if(this.comisionTurno == 'Tarde'){
                    this.horarioSelected = this.arrayHorarioTarde;
                    this.getHorario(this.id_comision, this.horarioSelected);
                }else{
                    this.horarioSelected = this.arrayHorarioNoche;
                    this.getHorario(this.id_comision, this.horarioSelected);
                }
            });
        });
  }

  filterByDay(horas:Horario[], horarioSelected:Horario []){
    for (var dia of this.dias){
      var horasFiltradas = horas.filter(hora => hora.day == dia);
      this.filterByHour(horasFiltradas, dia, horarioSelected);
    }
    //console.log(this.datePipe.transform("Sat, 01 Jan 2000 09:45:00 -03 -03:00", 'HH:mm'));
    //console.log(this.arrayHorario);
  }

  filterByHour(horaXdia:any, dia:string, horarioSelected:Horario []){
    for (var value of horaXdia){
      let hora = this.datePipe.transform(value.timetable.hour_init, 'HH:mm');
      for(var item of horarioSelected){
        if(item.day == dia && item.hour_init == hora ){
          item["subject"] = value;
        }
      }
    }
  }

  getHorario(id:any, horarioSelected:Horario[]){
    this._horariosService.getHorario(id).subscribe(data => {
      this.horarios = data;
      this.filterByDay(this.horarios, horarioSelected);
    })
  }

  getSchedule(item){
    if(item.subject){
      this._router.navigate(['/horario/admin', item.subject.id]);
      console.log(item);
    }
  }
}
