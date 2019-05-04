import { Component } from '@angular/core';
import 'rxjs/Rx'
import { AmazingTimePickerService } from 'amazing-time-picker';
import { HorariosService } from '../../services/horarios.service';
import { Timetable } from '../../interfaces/timetable';
import {ActivatedRoute, Router} from "@angular/router";
import * as moment from 'moment';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html'
})

export class TimetableComponent {

  submitted: boolean = false;
  timetable = new Timetable;
  hour_init:any;
  hour_end:any;
  formError:boolean = false;
  errorData;
  horaSaved:boolean = false;
  hoursAllowed: Array<any> = ['08:00','08:45','09:30','10:15','11:00','11:45','12:30','13:15','14:00','14:45','15:30','16:15','17:00','17:45','18:30','18:15','19:00','19:45','20:30','21:15','22:00','22:45','23:30'];
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
        this.checkAllowedHours('hour_init', time);
      });
  }

  /*public getHourEnd() {
      const amazingTimePicker = this.atp.open({
          time:  this.hour_end,
          locale: 'es',
          arrowStyle: {
              background: 'red',
              color: 'white'
          }
      });
      amazingTimePicker.afterClose().subscribe(time => {
          //this.timetable.hour_end = time;
          this.checkAllowedHours('hour_end',time);
      });
  }*/

  checkAllowedHours(type, time){
    if(this.hoursAllowed.includes(time)){
      this.formError = false;
      this.timetable[type] = time;
      this.calcHourEnd(time);
    }else{
      this.formError = true;
      this.errorData = [`La hora ${time} no está permitida`];
    }
  }

  calcHourEnd(time){
    var myDate = `2017-04-14 ${time}`; 
    var hour_end = moment(myDate).add(45, 'm').format('HH:mm');
    //console.log(hour_end);
    this.timetable.hour_end = hour_end;
  }

  createTimetable(timetable){
    this.submitted = true;
    //console.log(timetable);
    this._horaService.createTimetable(timetable).subscribe(data => {
      if(data.error){
        this.formError = true;
        this.errorData = data.data;
      }else{
        this.horaSaved = true;
        setTimeout(() => {
          this._router.navigate(['/horas']);
        }, 1500);
      }
    });
  }

}