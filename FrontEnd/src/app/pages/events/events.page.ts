import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';
import { IEvent } from '../../../../../BackEnd/src/Interfaces/IEvent';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
  public events : IEvent[] = []
  public id = []
  public toShow =""
  public isLogged = false
  constructor(private eventService: EventService, private userService: UserService) { }
  
  async ngOnInit() {
    try{
      this.events = await this.eventService.all(0, 30)
      this.checkLogged()
    }catch(error){
      return error
    }
  }
  buyTicket = async (i:number) =>{
    sessionStorage.setItem("ticket", this.events[i].id)
    try{
      await this.userService.buyTicket()
      window.location.replace('http://localhost:4200/user')
    }catch(err){
      return err
    }
  }
  checkLogged = () =>{
    this.isLogged = sessionStorage.getItem("token") ? true : false
  }
  show = (i:number) =>{
    this.toShow = this.events[i].id
    alert(this.toShow);
  }

}
