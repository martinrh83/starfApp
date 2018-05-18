import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'
import { Comision } from '../interfaces/comision';


@Injectable()
export class ComisionesService {

  //private nivelesUrl = 'https://railsapidemo.herokuapp.com/api/v1/grades'
  //public clsUrl = 'https://railsapidemo.herokuapp.com/api/v1/school_years'
  private comisionesUrl = 'http://localhost:3000/api/v1/courses'
  //private comisionesUrl = 'https://railsapidemo.herokuapp.com/api/v1/courses'
  
  constructor(private http:Http) { }

  getComisiones(): Observable<Comision []>{
    return this.http.get(this.comisionesUrl).map((response: Response)=> response.json())
  }

  createComision(comision:Comision){
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers:headers});
    return this.http.post(this.comisionesUrl, JSON.stringify(comision), options).map((res:Response) => res.json()) 

  }

}
