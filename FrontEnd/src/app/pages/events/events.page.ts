import { Component, Input, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';
import { IEvent } from '../../../../../BackEnd/src/Interfaces/IEvent';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
  getEvents: IEvent[]
  theatreEvents: IEvent[]
  public id = []
  public toShow =""
  public isLogged = false
  imgUrl = ["https://www.political24.it/wp-content/uploads/2021/03/Pippo-Baudo-Political24.jpg"]
  constructor(private eventService: EventService, private userService: UserService) { }
  
  async ionViewWillEnter(){
    
  }

  async ngOnInit() {
    this.checkLogged()
    /* try{
      this.events = await this.eventService.all(0, 30)
      this.checkLogged()
    }catch(error){
      return error
    } */
  }

  getFromInput(myInput){
    this.getEvents = myInput
  }
 /*  buyTicket = async (i:number) =>{
    sessionStorage.setItem("ticket", this.events[i].id)
    try{
      await this.userService.buyTicket()
      window.location.replace('http://localhost:4200/user')
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
  } */

  checkLogged = () =>{
    this.isLogged = sessionStorage.getItem("token") ? true : false
  }/* 
  show = (i:number) =>{
    this.toShow = this.events[i].id
    alert(this.toShow);
  } */

}
