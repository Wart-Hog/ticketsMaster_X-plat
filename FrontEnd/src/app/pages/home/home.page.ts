import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';
import { IEvent } from '../../../../../BackEnd/src/Interfaces/IEvent';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public events : IEvent[] = []
  isLogged = true
  constructor(private eventService: EventService,private userService: UserService) { }
  
  async ngOnInit() {
    try{
      this.events = await this.eventService.all(0, 50)
    }catch(err){
      return err
    }
  }
  ////.-----!!!! aggiungere pop up per acquisto effettuato
  buyTicket = async (i:number) =>{
    sessionStorage.setItem("ticket", this.events[i].id)
    try{
      await this.userService.buyTicket()
    }catch(err){
      return err
    }
  }

  addFavorite = async (i:number) =>{
    sessionStorage.setItem("favorite", this.events[i].id)
    try{
      await this.userService.addFavorite()
    }catch(err){
      return err
    }
  }

  
}


