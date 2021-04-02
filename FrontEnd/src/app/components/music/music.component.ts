import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { IEvent } from '../../../../../BackEnd/src/Interfaces/IEvent';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss'],
})
export class MusicComponent implements OnInit {
  public events : IEvent[] = []
  public isLogged = false
  @Output() music: EventEmitter<any> = new EventEmitter<any>()
  constructor(private eventService: EventService) {}

  async ngOnInit() {
    try{
      this.events = await this.eventService.getMusicEvents()
      this.checkLogged()
    }catch(error){
      return error
    }
  }

  getMusic = () =>{
    this.music.emit(this.events)
  }

  checkLogged = () =>{
    this.isLogged = sessionStorage.getItem("token") ? true : false
  }
}
