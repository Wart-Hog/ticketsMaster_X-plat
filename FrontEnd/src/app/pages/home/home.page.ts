import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { EventService } from 'src/app/services/event.service';
import { UserService } from 'src/app/services/user.service';
import { IEvent } from '../../../../../BackEnd/src/Interfaces/IEvent';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public events : IEvent[]
  twoEvents: IEvent[]
  place1 = ""
  place2 = ""

  isLogged = true
  constructor(private eventService: EventService,private userService: UserService,public toastController: ToastController) { }
  
  async ionViewWillEnter(){
    try{
      this.events = await this.eventService.all(0, 50)
      this.twoEvents = [this.events[Math.floor(Math.random() * this.events.length)], this.events[Math.floor(Math.random() * this.events.length)]]
      this.place1 = this.twoEvents[0].place
      this.place2 = this.twoEvents[1].place
      
    }catch(err){
      return err
    }
  }

  async ngOnInit() {
    
  }
  ////.-----!!!! aggiungere pop up per acquisto effettuato
  buyTicket = async (i:number) =>{
    sessionStorage.setItem("ticket", this.events[i].id)
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
    sessionStorage.setItem("favorite", this.events[i].id)
    try{
      await this.userService.addFavorite()
      this.favouriteToast()
    }catch(err){
      return err
    }
  }

  
}


