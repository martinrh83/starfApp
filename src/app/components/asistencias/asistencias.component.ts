import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-asistencias',
  templateUrl: './asistencias.component.html',
  styleUrls: ['./asistencias.component.css']
})
export class AsistenciasComponent implements OnInit {
  comControl = new FormControl('', Validators.required);
  matControl = new FormControl('', Validators.required);
  filteredOptions: Observable<string[]>;
  filteredOptionsMat: Observable<string[]>;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isOptional = false;
  options: string[] = ['2k1', '3k1', '4k1'];
  optionsMat: string[] = ['Discreta', 'Algoritmos', 'Arquitectura'];
  states;
  
  dataSource = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  ];

  displayedColumns: string[] = ['legajo', 'name', 'attendances'];
  constructor(private _formBuilder: FormBuilder) { 
    //this.loadStates();
  }

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
   
 }
 refreshForms(){
   //this.filteredOptions = this.options;

   this.firstFormGroup.reset();
   this.secondFormGroup.reset();
 }
 private _filter(value: string, array: string []): string[] {
   console.log(value)
   if(value == null){
     return array;
   }
   const filterValue = value.toLowerCase();

   return array.filter(option => option.toLowerCase().includes(filterValue));
 }

  loadStates() {
    var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
       Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
       Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
       Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
       North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
       South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
       Wisconsin, Wyoming';
    this.states =  allStates.split(/, +/g).map( function (state) {
       return {
          value: state.toUpperCase(),
          display: state
       };
    });
 }

}
