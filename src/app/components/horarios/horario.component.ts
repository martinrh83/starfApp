import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'
import { AmazingTimePickerService } from 'amazing-time-picker';
import { MateriasService } from '../../services/materias.service';
import { HorariosService } from '../../services/horarios.service';
import { Materia } from '../../interfaces/materia';
import { Horario } from '../../interfaces/horario';
import { Aula } from '../../interfaces/aula';
import { Timetable } from '../../interfaces/timetable';
import {ActivatedRoute, Router} from "@angular/router";
import { DatePipe } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html'
})

export class HorarioComponent implements OnInit {
  public comision_id:any;
  submitted: boolean = false;
  materias:Materia[];
  timetables:Timetable[];
  aulas: Aula[];
  horario = new Horario;
  selectedHs = [];
  formatedDays = [];
  dropdownSettings = {};
  selectedDays = [];

  constructor(private atp: AmazingTimePickerService, private _horaService: HorariosService, private _matService: MateriasService, private router:ActivatedRoute, private _router:Router, private datePipe: DatePipe) {
    this.router.params.subscribe( params => {
        this.comision_id = params['com_id'];
        this.horario.course_id = this.comision_id;
    });
    this._matService.getMaterias().subscribe(data => {
      this.materias = data;
     });
    this._horaService.getTimetables().subscribe(data=>{
      let hoursList = data;
      this.timetables = hoursList.map(timetable => ({ id: timetable.id, text: `${this.datePipe.transform(timetable.hour_init, 'HH:mm')} - ${this.datePipe.transform(timetable.hour_end, 'HH:mm')}` }));
      console.log(this.timetables)
    })
    this._horaService.getAulas().subscribe(data=>{
      this.aulas = data;
    })

  }


  ngOnInit() {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  saveDaysSelected(selectedDays) {
    this.selectedDays = selectedDays;
    this.formatedDays = selectedDays.map(day =>(moment(day).format('dddd, DD/MM/YYYY')));
  }

  createHorario(horario:Horario,selectedHs){
    this.submitted = true;
    console.log(horario);
    this._horaService.createHorario(horario, this.comision_id,selectedHs,this.selectedDays).subscribe(data => {console.log(data)});
    //this._router.navigate(['/horarios/', this.comision_id]);
  }

}