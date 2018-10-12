import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'
import { AmazingTimePickerService } from 'amazing-time-picker';
import { HorariosService } from '../../services/horarios.service';
import { Timetable } from '../../interfaces/timetable';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-horario',
  templateUrl: './timetable.component.html'
})

export class TimetableComponent implements OnInit {

  submitted: boolean = false;
  timetable = new Timetable;
  hour_init:any;
  hour_end:any;

  constructor(private atp: AmazingTimePickerService, private _horaService: HorariosService, private router:ActivatedRoute, private _router:Router) {

  }

  public getHourInit() {
      const amazingTimePicker = this.atp.open({
          time:  this.hour_init,
          locale: 'es',
          arrowStyle: {
              background: 'red',
              color: 'white'
          }
      });
      amazingTimePicker.afterClose().subscribe(time => {
          this.timetable.hour_init = time;
      });
  }

  public getHourEnd() {
      const amazingTimePicker = this.atp.open({
          time:  this.hour_end,
          locale: 'es',
          arrowStyle: {
              background: 'red',
              color: 'white'
          }
      });
      amazingTimePicker.afterClose().subscribe(time => {
          this.timetable.hour_end = time;
      });
  }

  ngOnInit() {

  }

  createTimetable(timetable){
    this.submitted = true;
    this._horaService.createTimetable(timetable).subscribe(data => {console.log(data)});
  }

}