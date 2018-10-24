import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/socket.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dataSocket:any;
  constructor(private _socketService: DataService) { 
    console.log(this._socketService.data);
    this.dataSocket = this._socketService.data
    console.log(this.dataSocket)
    //this._socketService.updateAsistencia(this.dataSocket)
  }

  ngOnInit() {

  }

  ngOnDestroy() {
  }

}
