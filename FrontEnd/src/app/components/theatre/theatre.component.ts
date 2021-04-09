import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { EventService } from 'src/app/services/event.service';
import { IEvent } from '../../../../../BackEnd/src/Interfaces/IEvent';

@Component({
  selector: 'app-theatre',
  templateUrl: './theatre.component.html',
  styleUrls: ['./theatre.component.scss'],
})
export class TheatreComponent implements OnInit {
  public events : IEvent[] = []
  public isLogged = false
  public updateValues: boolean
  @Input() selected = false
  @Output() theatre: EventEmitter<any> = new EventEmitter<any>()
  constructor(private eventService: EventService,private dataSharingService: DataSharingService) {
    this.dataSharingService.changes.subscribe( async value => {
      this.updateValues = value;
      this.events = await this.eventService.getTheatreEvents()
      this.checkLogged()
    });
}

  async ngOnInit() {
    
  }

  getTheatre = () =>{
    this.theatre.emit(this.events)
  }

  checkLogged = () =>{
    this.isLogged = sessionStorage.getItem("token") ? true : false
  }
}
