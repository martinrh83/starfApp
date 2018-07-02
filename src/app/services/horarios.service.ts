import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'
import { Horario } from '../interfaces/horario';

@Injectable()
export class HorariosService {

  private horariosUrl = 'https://railsapidemo.herokuapp.com/api/v1/schedules'
  //private horariosUrl = 'http://localhost:3000/api/v1/schedules'
  
  constructor(private http:Http) { }

  getHorarios(): Observable<Horario []>{
    return this.http.get(this.horariosUrl).map((response: Response)=> response.json())
  }

  createHorario(horario:Horario, id:string){
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers:headers});
    return this.http.post(`http://railsapidemo.herokuapp.com/api/v1/courses/${id}/schedules`, JSON.stringify(horario), options).map((res:Response) => res.json()) 

  }
  getHorario(id:string){
    return this.http.get(`http://railsapidemo.herokuapp.com/api/v1/courses/${id}/schedules`).map((response: Response)=> response.json())
  }

}
