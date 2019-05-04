import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'
import { Horario } from '../interfaces/horario';
import { Aula } from '../interfaces/aula';
import { Timetable } from '../interfaces/timetable';
import { URL_SERVICIOS } from '../config/url';

@Injectable()
export class HorariosService {
  private horariosUrl = URL_SERVICIOS + "/schedules"
  private timetablesUrl = URL_SERVICIOS + "/timetables"
  private aulasUrl = URL_SERVICIOS + "/classrooms"
  
  constructor(private http:Http) { }

  getAulas(): Observable<Aula []>{
    return this.http.get(this.aulasUrl).map((response: Response)=> response.json())
  }
  
  getHorarios(): Observable<Horario []>{
    return this.http.get(this.horariosUrl).map((response: Response)=> response.json())
  }

  createHorario(horario:Horario, id:string, selectedHs, selectedDaysArr){
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers:headers});
    return this.http.post(`${URL_SERVICIOS}/courses/${id}/schedules`, JSON.stringify({horario, selectedHs, selectedDaysArr}), options).map((res:Response) => res.json()) 

  }
  getHorario(id:string){
    return this.http.get(`${URL_SERVICIOS}/courses/${id}/schedules`).map((response: Response)=> response.json())
  }

  getTimetables(): Observable<Timetable []>{
    return this.http.get(this.timetablesUrl).map((response: Response)=> response.json())
  }

  createTimetable(timetable){
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers:headers});
    return this.http.post(`${URL_SERVICIOS}/timetables`, JSON.stringify(timetable), options).map((res:Response) => res.json()) 
  }

  deleteTimetable(timeId: number): Observable<number> {
    return this.http.delete(`${this.timetablesUrl}/${timeId}`).map(success => success.status);
  }

}
