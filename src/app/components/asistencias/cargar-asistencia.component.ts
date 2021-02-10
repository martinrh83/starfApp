import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-cargar-asistencia',
  templateUrl: './cargar-asistencia.component.html',
  styleUrls: ['./cargar-asistencia.component.css']
})
export class CargarAsistenciaComponent implements OnInit {
  
  comControl = new FormControl('', Validators.required);
  matControl = new FormControl({value: '', disabled:true}, Validators.required);
  dayControl = new FormControl('', Validators.required);
  legajoControl = new FormControl('', Validators.required);
  filteredOptions: Observable<string[]>;
  filteredOptionsMat: Observable<string[]>;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  isOptional = false;
  disableBtn = true;
  submitBtn = true;
  options: string[] = ['1k1','1k2', '1k3', '1k4','1k5', '1k6', '1k7', '1k8','2k1','2k2','2k3','2k4','2k5','2k6', '3k1', '3k2', '3k3', '3k4','4k1','4k2', '4k3', '5k1','5k2'];
  optionsMat: string[] = ['Algebra y Geometría Analítica', 'Análisis Matemático I','Matematica Discreta', 'Algoritmos y Estructura de Datos', 'Arquitectura de Computadoras',
'Sistemas y Organizaciones', 'Química', 'Ingeniería y Sociedad', 'Análisis de Sistemas', 'Sistemas de Representación', 'Análisis Matemático II', 'Sintáxis y Semántica de los Lenguajes', 'Física I', 'Paradigmas de Programación', 'Inglés I', 'Probabilidad y Estadística', 'Diseño de Sistemas', 'Sistemas Operativos', 'Física II', 'Economía', 'Gestión de Datos', 'Inglés II', 'Matemática Superior', 'Legislacíon', 'Administración de Recursos', 'Redes de Información', 'Investigación Operativa','Proyecto Final', 'Inteligencia Artificial', 'Administración Gerencial', 'Sistemas de Gestión', ];
  //date = new FormControl(_moment([2017, 0, 1]));
  constructor(private _formBuilder: FormBuilder, private snackBar: MatSnackBar) { }

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
      comControl: this.comControl,
      matControl: this.matControl,
      legajoControl: this.legajoControl,
      dayControl: this.dayControl
      
    });
    
    this.comControl.valueChanges.subscribe(value => {
      if(value && value != ''){
        this.matControl.enable();
      }else{
        this.matControl.disable();
      }
      console.log(value)
      /*if (value) {
        this.matControl.enable();
        //const dept = this.departamentos.find(d => d.value === value);
        if (value){
          console.log(value)
          //this.matControl.setValue('asasdasd');
        }
          
      }*/
    });
 }
 refreshForms(){
   this.firstFormGroup.reset();
 }
 
 private _filter(value: string, array: string []): string[] {
   if(value == null){
     return array;
   }
   const filterValue = value.toLowerCase();

   return array.filter(option => option.toLowerCase().includes(filterValue));
 }

  openSnackBar() {
    this.snackBar.open('Se ha registrado la asistencia','', {
      duration: 3000
    });
  }
}
