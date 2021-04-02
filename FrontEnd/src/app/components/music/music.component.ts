import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { EventService } from 'src/app/services/event.service';
import { IEvent } from '../../../../../BackEnd/src/Interfaces/IEvent';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss'],
  providers: []
})
export class MusicComponent implements OnInit {
  public events : IEvent[] = []
  public isLogged = false
  public updateValues: boolean
  @Output() music: EventEmitter<any> = new EventEmitter<any>()
  constructor(private eventService: EventService,private dataSharingService: DataSharingService) {
      this.dataSharingService.changes.subscribe( async value => {
        this.updateValues = value;
        this.events = await this.eventService.getMusicEvents()
        this.checkLogged()
      });
  }

  async ngOnInit() {
    // try{
    //   this.events = await this.eventService.getMusicEvents()
    //   this.checkLogged()
    // }catch(error){
    //   return error
    // }
  }

  getMusic = () =>{
    this.music.emit(this.events)
  }

  checkLogged = () =>{
    this.isLogged = sessionStorage.getItem("token") ? true : false
  }
}
