import { Component, OnInit, NgZone } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';
import { StarfService } from "../../services/starf.service";
import * as _moment from 'moment';
@Component({
  selector: 'app-cargar-excepcion',
  templateUrl: './cargar-excepcion.component.html',
  styleUrls: ['./cargar-excepcion.component.css']
})
export class CargarExcepcionComponent implements OnInit {
  comControl = new FormControl('', Validators.required);
  matControl = new FormControl({value: '', disabled:true}, Validators.required);
  dayControl = new FormControl('', Validators.required);
  filteredOptions: Observable<string[]>;
  filteredOptionsMat: Observable<string[]>;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  isOptional = false;
  disableBtn = true;
  submitBtn = true;
  options: string [] = [];
  optionsMat: string [] = [];

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
      fecha: date
    }
    console.log(body)
    this.ngZone.run(()=>{
      this._starfService.post('notifications/create_exception', body).subscribe((res)=>{
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
