import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-cargar-asistencia',
  templateUrl: './cargar-asistencia.component.html',
  styleUrls: ['./cargar-asistencia.component.css']
})
export class CargarAsistenciaComponent implements OnInit {
  
  comControl = new FormControl('', Validators.required);
  matControl = new FormControl('', Validators.required);
  dayControl = new FormControl('', Validators.required);
  legajoControl = new FormControl('', Validators.required);
  filteredOptions: Observable<string[]>;
  filteredOptionsMat: Observable<string[]>;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  isOptional = false;
  options: string[] = ['5k1', '2k1', '4k4'];
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
    this.fourthFormGroup = this._formBuilder.group({
      legajoControl: this.legajoControl
    });
 }
 refreshForms(){
   this.firstFormGroup.reset();
   this.secondFormGroup.reset();
   this.thirdFormGroup.reset();
   this.fourthFormGroup.reset();
 }
 
 private _filter(value: string, array: string []): string[] {
   if(value == null){
     return array;
   }
   const filterValue = value.toLowerCase();

   return array.filter(option => option.toLowerCase().includes(filterValue));
 }

}
