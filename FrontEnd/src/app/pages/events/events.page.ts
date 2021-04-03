import { Component, Input, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
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
  constructor(private eventService: EventService, private userService: UserService,public toastController: ToastController) { }
  
  buyTicket = async (i:number) =>{
    sessionStorage.setItem("ticket", this.getEvents[i].id)
    try{
      await this.userService.buyTicket()
      this.cartToast()
    }catch(err){
      return err
    }
  }
  async cartToast() {
    const toast = await this.toastController.create({
      message: 'Added to cart',
      duration: 2000
    });
    toast.present();
  }
  async favouriteToast() {
    const toast = await this.toastController.create({
      message: 'Added to favourite',
      duration: 2000
    });
    toast.present();
  }

  addFavorite = async (i:number) =>{
    sessionStorage.setItem("favorite", this.getEvents[i].id)
    try{
      await this.userService.addFavorite()
      this.favouriteToast()
    }catch(err){
      return err
    }
  }

  async ngOnInit() {
    this.checkLogged()
  }

  getFromInput(myInput){
    this.getEvents = myInput
  }

  checkLogged = () =>{
    this.isLogged = sessionStorage.getItem("token") ? true : false
  }
}
