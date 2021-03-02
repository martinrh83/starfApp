import { Component, OnInit, NgZone } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';
import { StarfService } from "../../services/starf.service";
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
  options: string [] = [];
  //options: string[] = ['1k1','1k2', '1k3', '1k4','1k5', '1k6', '1k7', '1k8','2k1','2k2','2k3','2k4','2k5','2k6', '3k1', '3k2', '3k3', '3k4','4k1','4k2', '4k3', '5k1','5k2'];
  optionsMat: string [] = [];
  /* optionsMat: string[] = ['Algebra y Geometría Analítica', 'Análisis Matemático I','Matematica Discreta', 'Algoritmos y Estructura de Datos', 'Arquitectura de Computadoras',
'Sistemas y Organizaciones', 'Química', 'Ingeniería y Sociedad', 'Análisis de Sistemas', 'Sistemas de Representación', 'Análisis Matemático II', 'Sintáxis y Semántica de los Lenguajes', 'Física I', 'Paradigmas de Programación', 'Inglés I', 'Probabilidad y Estadística', 'Diseño de Sistemas', 'Sistemas Operativos', 'Física II', 'Economía', 'Gestión de Datos', 'Inglés II', 'Matemática Superior', 'Legislacíon', 'Administración de Recursos', 'Redes de Información', 'Investigación Operativa','Proyecto Final', 'Inteligencia Artificial', 'Administración Gerencial', 'Sistemas de Gestión', ]; */
  //date = new FormControl(_moment([2017, 0, 1]));
  constructor(private _formBuilder: FormBuilder, private snackBar: MatSnackBar, private _starfService: StarfService, private ngZone: NgZone) { 
    this.ngZone.run(()=>{
      this._starfService.get('notifications/courses_list').subscribe((res)=>{
        //console.log(res.data.arraySysacad.comision)
        this.options = res.data.arraySysacad.comision;
      })
    })
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
      comControl: this.comControl,
      matControl: this.matControl,
      legajoControl: this.legajoControl,
      dayControl: this.dayControl
      
    });
    
    this.comControl.valueChanges.subscribe(value => {
      console.log('Detecting changes in com input')
      if(!value)return;
      if(value.length > 2 && value != ''){
        //console.log('entre aqui')
        //console.log(value)
        this._starfService.post('notifications/subjects_list', {comision: value}).subscribe((res)=>{
          //console.log(res)
          if(res.status == 'success'){
            this.optionsMat = res.data.arrayFiltered.materia;
            this.matControl.enable();
          }
        })
      }else{
        this.matControl.disable();
      }
    });
    this.firstFormGroup.valueChanges 
    .subscribe((changedObj: any) => {
      //console.log(changedObj)
      this.disableBtn = this.firstFormGroup.valid;
    });
  }

  onSubmit(){
    this.submitBtn = false;
    let submit = this.firstFormGroup.value;
    let date = submit.dayControl.toDate();
    let body = {
      comision: submit.comControl, 
      materia: submit.matControl,
      legajo: submit.legajoControl,
      fecha: date
    }
    //console.log(body)
    this.ngZone.run(()=>{
      this._starfService.post('notifications/manual_attendance', body).subscribe((res)=>{
        if(res.status == 'success'){
          //console.log(res)
          this.openSnackBar(res.message);
          this.refreshForms();       
        }
        
      },(err)=>{
        console.log(err)
        this.openSnackBar(err.error.message)
        this.refreshForms();
      }) 
    })
    
  }

  refreshForms(){ 
    this.firstFormGroup.reset();
    this.comControl.enable();
    this.matControl.disable();
  }
 
  private _filter(value: string, array: string []): string[] {
    if(value == null){
      return array;
    }
    const filterValue = value.toLowerCase();

    return array.filter(option => option.toLowerCase().includes(filterValue));
  }

  openSnackBar(msg) {
    this.snackBar.open(msg,'', {
      duration: 3000
    });
  }
}
