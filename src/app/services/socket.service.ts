import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { map, catchError } from 'rxjs/operators';
import ReconnectingWebSocket from 'reconnecting-websocket';

@Injectable()
export class DataService {

  constructor(){
    let data = {'task_id':'1','legajo': '36034', 'alumno':'Romano Martin', 'confidence': '45', 'datetime':'asdasd'}
    setInterval(() => console.log(data), 1500);
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
}