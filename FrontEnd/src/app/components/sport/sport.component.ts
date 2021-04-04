import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { EventService } from 'src/app/services/event.service';
import { IEvent } from '../../../../../BackEnd/src/Interfaces/IEvent';

@Component({
  selector: 'app-sport',
  templateUrl: './sport.component.html',
  styleUrls: ['./sport.component.scss'],
})
export class SportComponent implements OnInit {
  public events : IEvent[] = []
  public isLogged = false
  public updateValues: boolean
  @Input() selected = false
  @Output() sport: EventEmitter<any> = new EventEmitter<any>()
  constructor(private eventService: EventService,private dataSharingService: DataSharingService) {
    this.dataSharingService.changes.subscribe( async value => {
      this.updateValues = value;
      this.events = await this.eventService.getSportEvents()
      this.checkLogged()
    });
}

  async ngOnInit() {
    // try{
    //   this.events = await this.eventService.getSportEvents()
    //   this.checkLogged()
    // }catch(error){
    //   return error
    // }
  }

  getSport = () =>{
    this.sport.emit(this.events)
  }

  checkLogged = () =>{
    this.isLogged = sessionStorage.getItem("token") ? true : false
  }
}
