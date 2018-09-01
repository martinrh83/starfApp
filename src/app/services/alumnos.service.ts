import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'
import { Alumno } from '../interfaces/alumno';
import { URL_SERVICIOS } from '../config/url';

@Injectable()
export class AlumnosService {
  public alumnosUrl = URL_SERVICIOS + "/students"

  constructor(private http:Http) { }

  getAlumnos(): Observable<Alumno []>{
    return this.http.get(this.alumnosUrl).map((response: Response)=> response.json())
  }

  getAlumno(id:number){
    return this.http.get( `${this.alumnosUrl}/${id}`)
  }

  createAlumno(nivel:Alumno){
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers:headers});
    return this.http.post(this.alumnosUrl, JSON.stringify(nivel), options).map((res:Response) => res.json()) 

  }
}