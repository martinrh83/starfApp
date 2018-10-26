import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'
import * as moment from 'moment';
moment.weekdays(true);

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})


export class CalendarComponent implements OnInit {

  public date = moment();
  public daysArr;
  public selectedDaysArr= [];
  @Output() valueChange = new EventEmitter();

  constructor(){

  }

  ngOnInit() {
    //console.log(this.date);
    this.daysArr = this.createCalendar(this.date);
  } 

  public todayCheck(day){
    if(!day){
      return false;
    }

    return moment().format('L') === day.format('L');
  }

  public isSelected(day){
    if(!day){
      return false;
    }
    if(this.selectedDaysArr.find((element)=>{
      if(moment(element).isSame(day)){
        return true;
      }
    })){
      return true;
    }

  }

  createCalendar(month){
    let firstDay = moment(month).startOf("M");
    console.log(firstDay);
    let days = Array.apply(null,{length:month.daysInMonth()}).map(Number.call, Number)
    .map(((n)=>{
      return moment(firstDay).add(n,'d');
    }))
    for(let n=0; n < firstDay.weekday();n++){
      days.unshift(null);
    }
    console.log(days)
    return days;

  }

  nextMonth(){
    this.date.add(1,'M');
    this.daysArr =this.createCalendar(this.date);
  }

  previousMonth(){
    this.date.subtract(1,'M');
    this.daysArr =this.createCalendar(this.date);
  }

  selectedDate(day){
    if(!day){
      return false;
    }

    if(this.selectedDaysArr.length > 0){
      console.log("ya hay un elemento")
      if(this.selectedDaysArr.find((element)=>{
        if(moment(element).isSame(day)){
          return true;
        }
      })){
        console.log("ya existe el elmento")
        this.selectedDaysArr.splice( this.selectedDaysArr.indexOf(day), 1 );
        console.log(this.selectedDaysArr)
      }else{
        this.selectedDaysArr.push(day.format());
        console.log(this.selectedDaysArr)
      }
    }else{
      this.selectedDaysArr.push(day.format());
      console.log(this.selectedDaysArr)
    }
    this.valueChange.emit(this.selectedDaysArr);
  }

}
