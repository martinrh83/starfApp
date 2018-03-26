import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'
import { Alumno } from '../interfaces/alumno';


@Injectable()
export class AlumnosService {
  //private nivelesUrl = 'http://localhost:3000/api/v1/grades'
  public alumnosUrl = 'http://localhost:3000/api/v1/students'
  //public alumnosUrl = 'https://railsapidemo.herokuapp.com/api/v1/students'

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