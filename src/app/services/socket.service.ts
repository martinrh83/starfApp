import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { URL_SERVICIOS } from '../config/url';
import { map, catchError } from 'rxjs/operators';
import ReconnectingWebSocket from 'reconnecting-websocket';

@Injectable()
export class DataService {
  data:any;
  constructor(private http:Http){
    this.data = {'task_id':'1','legajo': '36034', 'alumno':'Romano Martin', 'confidence': '45', 'datetime':'Tue, 09 Oct 2018 08:15:00 -03 -03:00'}
    //setInterval(() => {return this.data}, 15500);
    /*Observable.interval(55500)
        .subscribe(() => {
          console.log("eee")
          this.updateAsistencia(this.data).subscribe(data=>{console.log(data);});
    })*/
    /*let rws = new ReconnectingWebSocket('ws://jorgearias1:-d350la1@192.168.0.11:8000/testing/');
    rws.addEventListener('open', () => {
        
      let socket_request = {
                  "command":"join_task_group",
                  "task_type":"tracking",
                  "camera_id":"1"
              }
      rws.send(JSON.stringify(socket_request))
    });

    rws.addEventListener('message', (message) => {
        let data =  JSON.parse(message.data);
        if(data.error){

        }else if(data.join){
          let id_task = data.task_id
        }else if(data.leave){

        }else{
          console.log(data.message)
        }
    });*/

  }

  updateAsistencia(data:any){
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers:headers});
    return this.http.patch(URL_SERVICIOS + '/attendances/update', JSON.stringify(data), options).map((res:Response) => res.json()) 
  }

}