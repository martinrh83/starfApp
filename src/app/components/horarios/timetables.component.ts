import { Component } from '@angular/core';
import 'rxjs/Rx'
import { AmazingTimePickerService } from 'amazing-time-picker';
import { HorariosService } from '../../services/horarios.service';
import { Timetable } from '../../interfaces/timetable';
import {ActivatedRoute, Router} from "@angular/router";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-timetables',
  templateUrl: './timetables.component.html'
})

export class TimetablesComponent {

  loading:boolean = true;
  horas:Timetable[];
  horaDeleted:boolean = false;

  constructor(private _horaService: HorariosService, private router:ActivatedRoute, private _router:Router, private datePipe: DatePipe) {
    this.refreshTimes();
  }

  refreshTimes(){
    this._horaService.getTimetables().subscribe(data => {
      let hoursList = data;
      this.horas = hoursList.map(timetable => ({ id: timetable.id, hour_init: this.datePipe.transform(timetable.hour_init, 'HH:mm'), hour_end: this.datePipe.transform(timetable.hour_end, 'HH:mm')}));
      this.loading = false;
    });
  }

  //Delete hora
  delete(timeId: number) {
    this._horaService.deleteTimetable(timeId).subscribe(() => {
      this.refreshTimes();
      this.horaDeleted = true;
      document.documentElement.scrollTop = 0;
      setTimeout(() => {
        this.horaDeleted = false;
       },3000);
    });
  }

}