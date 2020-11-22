import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import * as _moment from 'moment';
@Component({
  selector: 'app-cargar-excepcion',
  templateUrl: './cargar-excepcion.component.html',
  styleUrls: ['./cargar-excepcion.component.css']
})
export class CargarExcepcionComponent implements OnInit {
  comControl = new FormControl('', Validators.required);
  matControl = new FormControl('', Validators.required);
  dayControl = new FormControl('', Validators.required);
  filteredOptions: Observable<string[]>;
  filteredOptionsMat: Observable<string[]>;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  isOptional = false;
  options: string[] = ['3k1', '4k1', '5k1'];
  optionsMat: string[] = ['Discreta', 'Algoritmos', 'Arquitectura'];
  //date = new FormControl(_moment([2017, 0, 1]));
  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.filteredOptions = this.comControl.valueChanges
     .pipe(
       startWith(''),
       map(value => this._filter(value, this.options))
     );
     this.filteredOptionsMat = this.matControl.valueChanges
     .pipe(
       startWith(''),
       map(value => this._filter(value, this.optionsMat))
     );
    this.firstFormGroup = this._formBuilder.group({
      comControl: this.comControl
    });
    this.secondFormGroup = this._formBuilder.group({
      matControl: this.matControl
    });
    this.thirdFormGroup = this._formBuilder.group({
      dayControl: this.dayControl
    });
   
 }
 refreshForms(){
   this.firstFormGroup.reset();
   this.secondFormGroup.reset();
   this.thirdFormGroup.reset();
 }

 private _filter(value: string, array: string []): string[] {
   if(value == null){
     return array;
   }
   const filterValue = value.toLowerCase();

   return array.filter(option => option.toLowerCase().includes(filterValue));
 }

}
