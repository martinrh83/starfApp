import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'
import { Horario } from '../interfaces/horario';
import { URL_SERVICIOS } from '../config/url';

@Injectable()
export class HorariosService {
  private horariosUrl = URL_SERVICIOS + "/schedules"
  
  constructor(private http:Http) { }

  getHorarios(): Observable<Horario []>{
    return this.http.get(this.horariosUrl).map((response: Response)=> response.json())
  }

  createHorario(horario:Horario, id:string){
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers:headers});
    return this.http.post(`${URL_SERVICIOS}/courses/${id}/schedules`, JSON.stringify(horario), options).map((res:Response) => res.json()) 

  }
  getHorario(id:string){
    return this.http.get(`${URL_SERVICIOS}/courses/${id}/schedules`).map((response: Response)=> response.json())
  }

}
