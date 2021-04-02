import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  @Output() theatre: EventEmitter<any> = new EventEmitter<any>()
  constructor(private eventService: EventService) {}

  async ngOnInit() {
    try{
      this.events = await this.eventService.getTheatreEvents()
      this.checkLogged()
    }catch(error){
      return error
    }
  }

  getTheatre = () =>{
    this.theatre.emit(this.events)
  }

  checkLogged = () =>{
    this.isLogged = sessionStorage.getItem("token") ? true : false
  }
}
