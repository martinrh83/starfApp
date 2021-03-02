import { trigger } from '@angular/animations';
import { Component, OnInit, NgZone } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { StarfService } from "../../services/starf.service";
@Component({
  selector: 'app-asistencias',
  templateUrl: './asistencias.component.html',
  styleUrls: ['./asistencias.component.css']
})
export class AsistenciasComponent implements OnInit {
  comControl = new FormControl('', Validators.required);
  matControl = new FormControl({value: '', disabled:true}, Validators.required);
  filteredOptions: Observable<string[]>;
  filteredOptionsMat: Observable<string[]>;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isOptional = false;
  showResults = false;
  disableBtn = true;
  submitBtn = true;
  options: string [] = [];
  //options: string[] = ['1k1','1k2', '1k3', '1k4','1k5', '1k6', '1k7', '1k8','2k1','2k2','2k3','2k4','2k5','2k6', '3k1', '3k2', '3k3', '3k4','4k1','4k2', '4k3', '5k1','5k2'];
  optionsMat: string [] = [];
  /*optionsMat: string[] = ['Algebra y Geometría Analítica', 'Análisis Matemático I','Matematica Discreta', 'Algoritmos y Estructura de Datos', 'Arquitectura de Computadoras',
'Sistemas y Organizaciones', 'Química', 'Ingeniería y Sociedad', 'Análisis de Sistemas', 'Sistemas de Representación', 'Análisis Matemático II', 'Sintáxis y Semántica de los Lenguajes', 'Física I', 'Paradigmas de Programación', 'Inglés I', 'Probabilidad y Estadística', 'Diseño de Sistemas', 'Sistemas Operativos', 'Física II', 'Economía', 'Gestión de Datos', 'Inglés II', 'Matemática Superior', 'Legislacíon', 'Administración de Recursos', 'Redes de Información', 'Investigación Operativa','Proyecto Final', 'Inteligencia Artificial', 'Administración Gerencial', 'Sistemas de Gestión', ];*/
  
  /*dataSource = [
    {legajo: 36034, name: 'Rodolfo Martín Romano Heredia', attendances: 50},
    {legajo: 24400, name: 'Germán Fringes', attendances: 45},
    {legajo: 26476, name: 'Luis Svaldi', attendances: 40},
    {legajo: 30666, name: 'Concepción  Pegoraro', attendances: 45 },
    {legajo: 37853, name: 'Matías Aramburu', attendances: 45 }
  ];*/
  dataSource = [];
  displayedColumns: string[] = ['legajo', 'name', 'attendances'];
  thereStudents = false;

  constructor(private _formBuilder: FormBuilder, private _starfService: StarfService, private ngZone: NgZone) {
    this.ngZone.run(()=>{
      this._starfService.get('notifications/courses_list').subscribe((res)=>{
        console.log(res.data.arraySysacad.comision)
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
      matControl: this.matControl
    });
    this.comControl.valueChanges.subscribe(value => {
      console.log('Detecting changes in com input')
      if(!value)return;
      if(value.length > 2 && value != ''){
        /* console.log('entre aqui')
        console.log(value) */
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

  refreshForms(){
    //this.filteredOptions = this.options;
    this.comControl.enable();
    this.firstFormGroup.reset();
    this.showResults = false;
    this.submitBtn = true;
    this.dataSource = [];
  }

  private _filter(value: string, array: string []): string[] {
    //console.log(value)
    if(value == null){
      return array;
    }
    const filterValue = value.toLowerCase();

    return array.filter(option => option.toLowerCase().includes(filterValue));
  }

  onSubmit(){
    
    this.submitBtn = false;
    this.comControl.disable();
    this.matControl.disable();
    let submit = this.firstFormGroup.value;
    //console.log(submit)
    this.ngZone.run(()=>{
      this._starfService.post('notifications/students_list', {comision: submit.comControl, materia: submit.matControl}).subscribe((res)=>{
        if(res.status == 'success'){
          //console.log(res)
          res.data.students.forEach(el => {
            this.dataSource.push({legajo: el.legajo, name: `${el.nombre} ${el.apellido}`, attendances: el.lastAttendance.percentageCompleted})
          });
          this.thereStudents = true;  
        }  
        this.showResults = true;
      },(err)=>{
        console.log('None student founded')
        this.thereStudents = false;
        this.showResults = true;
      }) 
    })
  }
}
